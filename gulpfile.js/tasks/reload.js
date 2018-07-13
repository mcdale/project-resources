var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var config = require('../config.js').reload;

gulp.task('reload', function(){

  browserSync.init(config.settings);

  gulp.watch('app/static/css/**/*.css').on('change', browserSync.reload);
  gulp.watch('app/static/js/**/*.js').on('change', browserSync.reload);
  gulp.watch(['app/templates/**/*.html','home/templates/**/*.html']).on('change', browserSync.reload);
});
