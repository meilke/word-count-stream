module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.initConfig({
    jshint: {
      files: [ 'src/**/*.js', 'test/**/*.spec.js', 'Gruntfile.js', 'index.js' ],
      options: {
        quotmark : 'single',
        node: true,
        indent: 2,
        unused: true,
        esnext: true,
        nomen: true
      }
    },
    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: [ 'src/**/*.js', 'test/**/*.spec.js' ]
      }
    }
  });

  grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
};