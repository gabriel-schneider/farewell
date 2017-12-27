const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

gulp.task('html', function() {
   gulp.src(['src/pug/*.pug', '!src/pug/base.pug'])
      .pipe(pug())
      .pipe(gulp.dest('demo'))
});

gulp.task('css', function() {
   gulp.src('node_modules/normalize.css/normalize.css')
      .pipe(gulp.dest('src/css'));
   gulp.src(['src/sass/farewell*'])
      .pipe(sass())
      .pipe(gulp.dest('src/css'));
});

gulp.task('default', ['html', 'css']);

gulp.task('watch', ['html', 'css'], function() {
   
   let notifyEvent = function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ',running tasks ...');
   }

   let watcherPug = gulp.watch(['src/pug/*.pug'], ['html']);
   watcherPug.on('change', function(event) {notifyEvent(event)});
   let watcherSass = gulp.watch(['src/sass/*.scss'], ['css']);
   watcherSass.on('change', function(event) {notifyEvent(event)});
})
