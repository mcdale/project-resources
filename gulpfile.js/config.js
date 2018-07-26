module.exports = {
  reload: {
    settings: {
      proxy: 'http://127.0.0.1:8000',
      reloadDelay: 500,
      reloadDebounce: 1500,
    },
  },
  javascripts: {
    src: ['core/assets/javascripts/**/*.js'],
    dest: 'app/static/js',
    entries: [
      {
        src: 'core/assets/javascripts/core/index.js',
        dest: 'core/core.js'
      }
    ],
  },
  stylesheets: {
    src: [
      'core/assets/stylesheets/**/*.{sass,scss}',
      'home/assets/stylesheets/**/*.{sass,scss}',
    ],
    dest: 'app/static/css',
    autoprefixer: {
        browsers: ['last 2 versions', 'ie 9-11', 'iOS 8'],
        cascade: false,
    },
    settings: {
        includePaths: [
          //'node_modules/normalize-scss/sass',
          'node_modules/bourbon/core',
          //'node_modules/bourbon-neat/core',
        ],
        outputStyle: 'expanded',
    },
    // liveLinting: true,
  },
  images: {
    src: [
      './core/assets/images/**/*.{png,jpg,jpeg}',
      //'./home/assets/images/**/*.{png,jpg,jpeg}',
    ],
    dest: 'app/static/img',
  },
  icons: {
    src: [
      'core/assets/images/logo_nesc.svg'
    ],
    dest: 'app/static',
  }

}
