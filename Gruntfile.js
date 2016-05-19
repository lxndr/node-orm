'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: [
      'build'
    ],

    eslint: {
      files: 'src/**/*.js'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dest: 'build',
          src: [
            'LICENSE',
            'README.md',
            'package.json'
          ]
        }]
      }
    },

    babel: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'build/lib'
        }]
      }
    }
  });

  grunt.registerTask('default', ['copy', 'babel']);
  grunt.registerTask('lint', ['eslint']);
};
