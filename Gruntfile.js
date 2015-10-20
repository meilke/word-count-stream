module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadTasks('tasks');

  var files = [ 'src/**/*.js', 'test/**/*.spec.js', 'Gruntfile.js' ];

  grunt.initConfig({
    jshint: {
      files: files,
      options: {
        quotmark : 'single',
        node: true,
        indent: 2,
        unused: true,
        nomen: true
      }
    },
    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: files
      }
    }
  });

  grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
};