module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      js: {
        files: [
          'index.js',
          'routes/**/*.js',
          'lib/*.js'
        ],
        tasks: ['develop'],
        options: { nospawn: true }
      }
    },
    develop: {
      server: {
        file: 'index.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-develop');

  grunt.registerTask('default', ['develop']);

};
