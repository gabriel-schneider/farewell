const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

gulp.task('html', function() {
   gulp.src(['src/pug/*.pug', '!src/pug/base.pug'])
      .pipe(pug())
      .pipe(gulp.dest('demo'))
});

gulp.task('css', function() {
   gulp.src(['src/sass/farewell*'])
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
});

gulp.task('default', ['html', 'css']);

gulp.task('watch', function() {
   gulp.watch(['src/pug/*.pug'], ['html']);
   gulp.watch(['src/sass/*.scss'], ['css']);
})
