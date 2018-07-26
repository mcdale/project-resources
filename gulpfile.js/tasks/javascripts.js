var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

var $ = require('gulp-load-plugins')();

var config = require('../config.js').javascripts;

gulp.task('scripts:core', function(done){
  var entries = config.entries;

  entries.forEach(function (entry) {
    var b = browserify({
        entries: entry.src, // Only need initial file, browserify finds the deps
        debug: true        // Enable sourcemaps
    });

    b.transform(babelify);  // Convert JS

    b.bundle()
      .pipe(source(entry.dest))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .pipe($.sourcemaps.write())

      .pipe(gulp.dest(config.dest));
  });

  done();
});

gulp.task('scripts:compile', ['scripts:core']);
gulp.task('javascripts', ['scripts:compile']);
