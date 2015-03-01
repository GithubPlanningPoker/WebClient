module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      task: {
        src: [
          'default.html'
        ],
        options: { }
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', []);
};
