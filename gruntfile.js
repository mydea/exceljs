'use strict';

const path = require('path');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
      },

      es5: {
        files: [
          {
            expand: true,
            src: ['./lib/**/*.js'],
            dest: './dist/es5',
          },
        ],
      },
    },

    webpack: {
      options: {
        stats: 'errors-only',
        mode: 'production',
        output: {
          path: path.resolve(__dirname, 'dist'),
        },
        node: {
          fs: 'empty',
        },
        performance: {
          maxAssetSize: 2000000,
          maxEntrypointSize: 2000000,
        },
        devtool: 'source-map',
        target: 'web',

        module: {
          rules: [
            {
              test: /\.js$/,
              include: [path.resolve(__dirname, 'lib')],
              use: {
                loader: 'babel-loader',
              },
            },
          ],
        },
      },

      bare: {
        entry: './lib/exceljs.bare.js',
        output: {
          filename: 'exceljs.bare.js',
        },
        optimization: {
          minimize: false,
        },
      },

      bareMin: {
        entry: './lib/exceljs.bare.js',
        output: {
          filename: 'exceljs.bare.min.js',
        },
      },

      dist: {
        entry: './lib/exceljs.browser.js',
        output: {
          filename: 'exceljs.js',
        },
        optimization: {
          minimize: false,
        },
      },

      distMin: {
        entry: './lib/exceljs.browser.js',
        output: {
          filename: 'exceljs.min.js',
        },
      },

      specBrowser: {
        entry: './spec/browser/exceljs.spec.js',
        output: {
          filename: './build/web/exceljs.spec.js',
        },
        devtool: 'none',
      },
    },

    copy: {
      dist: {
        files: [
          {src: './dist/es5/exceljs.nodejs.js', dest: './dist/es5/index.js'},
          {src: './LICENSE', dest: './dist/LICENSE'},
        ],
      },
    },

    jasmine: {
      dev: {
        src: ['./dist/exceljs.js'],
        options: {
          specs: './build/web/exceljs.spec.js',
        },
      },
    },
  });

  grunt.registerTask('build', ['babel', 'webpack', 'copy']);
};
