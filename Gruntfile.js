module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['src/js/**.js']
    },

    processhtml: {
      dist: {
        files: {
          'dist/default.html': ['src/default.html']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/default.html': 'dist/default.html',
          'dist/partials/game-layout.htm': 'src/partials/game-layout.htm',
          'dist/partials/join-layout.htm': 'src/partials/join-layout.htm',
          'dist/partials/start-layout.htm': 'src/partials/start-layout.htm',
          'dist/partials/vote-modal.htm': 'src/partials/vote-modal.htm'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.min.js': 'src/js/**.js'
        }
      }
    },

    copy: {
      dist: {
        options: {
          flatten: true
        },
        files: {
          'dist/external/angular.min.js': 'bower_components/angular/angular.min.js',
          'dist/external/ui-bootstrap-tpls.min.js': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'dist/external/angular-cookies.min.js': 'bower_components/angular-cookies/angular-cookies.min.js',
          'dist/external/angular-resource.min.js': 'bower_components/angular-resource/angular-resource.min.js',
          'dist/external/angular-route.min.js': 'bower_components/angular-route/angular-route.min.js',
          'dist/external/angular-sanitize.min.js': 'bower_components/angular-sanitize/angular-sanitize.min.js',
          'dist/favicon.ico': 'src/favicon.ico'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/style.min.css': 'src/css/style.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'copy', 'processhtml', 'htmlmin', 'cssmin']);
};
