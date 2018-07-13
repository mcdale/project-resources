var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge-stream');
var config = require('../config.js').icons;

gulp.task('icons:scale-icons', function() {
  // Define all icon sizes for Android
  const android = {
    'ldpi'   : { width: 36,  height: 36  },
    'mdpi'   : { width: 48,  height: 48  },
    'hdpi'   : { width: 72,  height: 72  },
    'xhdpi'  : { width: 96,  height: 96  },
    'xxhdpi' : { width: 144, height: 144 },
    '192x192': { width: 192, height: 192 },
    'xxxhdpi': { width: 196, height: 196 }
  };
  // Define all icon sizes for iOS
  const ios = {
    '-57x57'  : { width: 57,  height: 57  },
    '-114x114': { width: 114, height: 114 },
    '-72x72'  : { width: 72,  height: 72  },
    '-144x144': { width: 144, height: 144 },
    '-60x60'  : { width: 60,  height: 60  },
    '-120x120': { width: 120, height: 120 },
    '-180x180': { width: 180, height: 180 },
    '': { width: 180, height: 180 },
    '-76x76'  : { width: 76,  height: 76  },
    '-152x152': { width: 152, height: 152 },
    '-228x228': { width: 228, height: 228 },
    '-167x167': { width: 167, height: 167 },
    '-100x100'  : { width: 100, height: 100 },
    // Small
    '-40x40'  : { width: 40,  height: 40  },
    '-80x80'  : { width: 80,  height: 80  },
    //'120x120': { width: 120, height: 120 },
    // Settings
    '-29x29'  : { width: 29,  height: 29  },
    '-58x58'  : { width: 58,  height: 58  },
    '-87x87'  : { width: 87,  height: 87  },
    // Toolbar
    '-22x22'  : { width: 22,  height: 22  },
    '-44x44'  : { width: 44,  height: 44  },
    '-66x66'  : { width: 66,  height: 66  },
    // Tabbar
    '-25x25'  : { width: 25,  height: 25  },
    '-50x50'  : { width: 50,  height: 50  },
    '-75x75'  : { width: 75,  height: 75  }
  };

  const favicon = {
    '-16x16'  : { width: 16,  height: 16  },
    '-32x32'  : { width: 32,  height: 32  },
    '-96x96'  : { width: 96,  height: 96  },
    '-194x194': { width: 194,  height: 194  }
  }
  const androidImageStreams = Object.keys(android).reduce(
    function(agg, name) {
      agg.push(
        gulp.src(config.src)
          .pipe($.svg2png(android[name]))
          .pipe($.rename(`android-chrome-${name}.png`))
          .pipe(gulp.dest('.tmp/images'))
      );
      return agg;
    }, []
  );
  const iOSImageStreams = Object.keys(ios).reduce(
    function(agg, name) {
      agg.push(
        gulp.src(config.src)
          .pipe($.svg2png(ios[name]))
          .pipe($.rename(`apple-touch-icon${name}.png`))
          .pipe(gulp.dest('.tmp/images'))
      );
      return agg;
    }, []
  );
  const faviconImageStreams = Object.keys(favicon).reduce(
    function(agg, name) {
      agg.push(
        gulp.src(config.src)
          .pipe($.svg2png(favicon[name]))
          .pipe($.rename(`favicon${name}.png`))
          .pipe(gulp.dest('.tmp/images'))
      );
      return agg;
    }, []
  );

  return merge(androidImageStreams, iOSImageStreams, faviconImageStreams);
});

gulp.task('icons:nesc', ['icons:scale-icons'], function(){
  return gulp.src('.tmp/images/**/*.png')
  .pipe(gulp.dest(config.dest));
});

gulp.task('icons:favicons', ['icons:nesc'], function(){
    return gulp.src('.tmp/images/favicon-*.png')
    .pipe($.toIco('favicon.ico'))
    .pipe(gulp.dest(config.dest));
});

gulp.task('icons', ['icons:favicons']);
