var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../config.js').stylesheets;

gulp.task('sass-lint', function () {
    return gulp.src(config.src)
        .pipe($.cache('scsslint'))
        .pipe($.scssLint({
            maxBuffer: 400 * 1024,
        }))
        .pipe($.if(argv.fail, $.scssLint.failReporter()));
});

gulp.task('sass', function () {
    return gulp.src(config.src)
        .pipe($.sass(config.settings)
            .on('error', $.notify.onError({
                title: 'SASS compilation error',
                message: '<%= error.message %>',
                time: 10000,
            }))
        )
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.dest));
});

gulp.task('stylesheets:compile', function(){
  return gulp.src(config.src)
      .pipe($.sass(config.settings)
          .on('error', $.notify.onError({
              title: 'SASS compilation error',
              message: '<%= error.message %>',
              time: 10000,
          }))
      )
      .pipe($.autoprefixer(config.autoprefixer))
      .pipe(gulp.dest(config.dest));
});

gulp.task('stylesheets:watch', ['stylesheets:compile'], function() {
  gulp.watch(config.src, ['stylesheets:compile']);
});

gulp.task('stylesheets',['stylesheets:watch']);
