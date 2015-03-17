module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json') });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    all: ['src/js/**.js'],
    gruntfile: ['Gruntfile.js']
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.config('csslint', {
    all: {
      options: {
        import: false
      },
      src: ['src/css/*.css']
    }
  });

  grunt.loadNpmTasks('grunt-html-angular-validate');
  grunt.config('htmlangular', {
    all: {
      options: {
        tmplext: 'partial.htm',
        customtags: [
            'alert'
        ],
        customattrs: [
            'show-focus',
            'enter-submit'
        ]
      },
      files: {
        src: ['src/default.htm', 'src/partials/*.htm']
      },
    }
  });

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.config('processhtml', {
    dist: {
      files: {
        'dist/default.htm': ['src/default.htm']
      }
    },
    dev: {
      files: {
        'C:/inetpub/wwwroot/ghpp/default.htm': ['src/default.htm']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.config('htmlmin', {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        'dist/default.htm': 'dist/default.htm',
        'dist/partials/game.partial.htm': 'src/partials/game.partial.htm',
        'dist/partials/join.partial.htm': 'src/partials/join.partial.htm',
        'dist/partials/start.partial.htm': 'src/partials/start.partial.htm',
        'dist/partials/vote-modal.partial.htm': 'src/partials/vote-modal.partial.htm'
      }
    },
    dev: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        'C:/inetpub/wwwroot/ghpp/default.htm': 'C:/inetpub/wwwroot/ghpp/default.htm',
        'C:/inetpub/wwwroot/ghpp/partials/game.partial.htm': 'src/partials/game.partial.htm',
        'C:/inetpub/wwwroot/ghpp/partials/join.partial.htm': 'src/partials/join.partial.htm',
        'C:/inetpub/wwwroot/ghpp/partials/start.partial.htm': 'src/partials/start.partial.htm',
        'C:/inetpub/wwwroot/ghpp/partials/vote-modal.partial.htm': 'src/partials/vote-modal.partial.htm'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    dist: {
      files: {
        'dist/app.min.js': 'src/js/**.js'
      }
    },
    dev: {
      options: {
        beautify: true
      },
      files: {
        'C:/inetpub/wwwroot/ghpp/app.min.js': 'src/js/**.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    dist: {
      files: [
        { expand: true, flatten: true, cwd: 'bower_components/', src: [
          'angular/angular.min.js',
          'angular-bootstrap/ui-bootstrap-tpls.min.js',
          'angular-cookies/angular-cookies.min.js',
          'angular-resource/angular-resource.min.js',
          'angular-route/angular-route.min.js',
          'angular-sanitize/angular-sanitize.min.js'
          ],
          dest: 'dist/external'
      },
      { src: 'src/favicon.ico', dest: 'dist/favicon.ico' }
      ]
    },
    dev: {
      files: [
        { expand: true, flatten: true, cwd: 'bower_components/', src: [
          'angular/angular.js',
          'angular-bootstrap/ui-bootstrap-tpls.js',
          'angular-cookies/angular-cookies.js',
          'angular-resource/angular-resource.js',
          'angular-route/angular-route.js',
          'angular-sanitize/angular-sanitize.js'
          ],
          dest: 'C:/inetpub/wwwroot/ghpp/external'
      },
      { src: 'src/favicon.ico', dest: 'C:/inetpub/wwwroot/ghpp/favicon.ico' }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
      dist: {
        files: {
          'dist/style.min.css': 'src/css/style.css'
        }
      },
      dev: {
        files: {
          'C:/inetpub/wwwroot/ghpp/style.min.css': 'src/css/style.css'
        }
      }
    });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.config('clean', {
    all: ['html-angular-validate-report.json'],
    dist: ['dist/'],
    dev: ['C:/inetpub/wwwroot/ghpp/', '!C:/inetpub/wwwroot/ghpp/api/']
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    options: {
      livereload: true
    },
    gruntfile: {
      files: 'Gruntfile.js',
      tasks: ['jshint:gruntfile'],
      options: {
        reload: true
      }
    },
    js: {
      files: 'src/js/*.js',
      tasks: ['jshint', 'uglify:dev']
    },
    css: {
      files: 'src/css/*.css',
      tasks: ['csslint', 'cssmin:dev']
    },
    html: {
      files: ['src/default.htm', 'src/partials/start.partial.htm', 'src/partials/join.partial.htm', 'src/partials/game.partial.htm', 'src/partials/vote-modal.partial.htm'],
      tasks: ['processhtml:dev', 'htmlmin:dev']
    }
  });

  grunt.registerTask('dev', ['uglify:dev', 'copy:dev', 'processhtml:dev', 'htmlmin:dev', 'cssmin:dev']);
  grunt.registerTask('dist', ['clean:dist', 'uglify:dist', 'copy:dist', 'processhtml:dist', 'htmlmin:dist', 'cssmin:dist']);
  grunt.registerTask('check', ['jshint', 'csslint', 'htmlangular', 'clean:all']);
};
