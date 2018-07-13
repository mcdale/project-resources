var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('fonts:copy', function(done){
  gulp.src('assets/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./fonts'));

  // gulp.src('bower_components/font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2}')
  // .pipe(gulp.dest('./fonts'));

  done();
});

gulp.task('fonts',['fonts:copy'])
