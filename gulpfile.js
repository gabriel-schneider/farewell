const gulp = require('gulp');
const util = require('gulp-util');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const path = require('path');
const foreach = require('gulp-foreach');

function errorHandler(err) {
    console.log(err.toString())
    this.emit('end')
}

gulp.task('html', function() {

    gulp.src(['src/pug/*.pug', '!src/pug/base.pug'])
        .pipe(foreach(function(stream, file) {
            return stream.pipe(pug({
                pretty: true,
                data: {
                    filename: path.parse(file.path).name                    
                }
            }))
        }))
        .on('error', errorHandler)
        .pipe(gulp.dest('demo'))
    
});

gulp.task('css', function() {
   gulp.src('node_modules/normalize.css/normalize.css')
      .pipe(gulp.dest('src/css'))

   gulp.src(['src/sass/farewell*'])
    .pipe(sass())
    .on('error', errorHandler)
    .pipe(gulp.dest('src/css'))
});

gulp.task('default', ['html', 'css']);

gulp.task('watch', ['default'], function() {
   
   let notifyEvent = function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ',running tasks ...');
   }

   let watcherPug = gulp.watch(['src/pug/**/*.pug'], ['html']);
   watcherPug.on('change', function(event) {notifyEvent(event)});
   let watcherSass = gulp.watch(['src/sass/**/*.scss'], ['css']);
   watcherSass.on('change', function(event) {notifyEvent(event)});
})
