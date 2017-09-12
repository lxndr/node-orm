module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      files: [
        'dist',
        'lib'
      ]
    },

    eslint: {
      files: 'src/**/*.js'
    },

    mochaTest: {
      test: {
        src: 'tests/*.js'
      }
    },

    babel: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.js',
          dest: 'lib'
        }]
      },
      options: {
        presets: [
          ['env', {
            targets: {
              node: 'current'
            }
          }]
        ],
        plugins: [
          'transform-decorators-legacy',
          'transform-class-properties'
        ]
      }
    }
  });

  grunt.registerTask('default', ['babel']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
