module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    shell: {
      options: {
        stdout: true
      },
      selenium: {
        command: './selenium/start',
        options: {
          stdout: false,
          async: true
        }
      },
      protractor_install: {
        command: 'node ./node_modules/protractor/bin/install_selenium_standalone'
      },
      npm_install: {
        command: 'npm install'
      }
    },

    connect: {
      options: {
        base: '.'
      },
      webserver: {
        options: {
          hostname: '*',
          port: 8888,
          keepalive: true
        }
      },
      devserver: {
        options: {
          hostname: '*',
          port: 8888
        }
      },
      testserver: {
        options: {
          hostname: '*',
          port: 9999
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          hostname: '*',
          port: 5555,
          keepalive: true
        }
      }
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: "./test/protractor.conf.js"
      },
      singlerun: {},
      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/scripts/{,*/}*.js'
      ]
    },

    concat: {
      clientScripts: {
        dest: 'app/assets/app.js',
        src: [
          'app/scripts/app.js'
        ]
      },
      clientStyles: {
        dest: 'app/assets/app.css',
        src: [
          'app/styles/app.css'
        ]
      },

      adminStyles: {
        dest: 'admin/app/assets/app.css',
        src: [
          'admin/app/styles/app.css',
          //place your Stylesheet files here
        ]
      },
      adminScripts: {
        options: {
          separator: ';'
        },
        dest: './admin/app/assets/app.js',
        src: [
          'lib/moment.js',
          'lib/angular/angular.js',
          'lib/angular/angular-route.js',
          'lib/angular/angular-resource.min.js',
          'lib/angular-file-upload.js',
          'lib/underscore-min.js',

          'admin/app/scripts/app.js',
          'admin/app/scripts/directives.js',
          'admin/app/scripts/questionsets.js',
          'admin/app/scripts/questions.js',
          'admin/app/scripts/detail.js',
          'admin/app/scripts/login.js',
          'admin/app/scripts/quiz.js',
          'admin/app/scripts/quiz-editor.js',
          'admin/app/scripts/results.js',
          'admin/app/scripts/form-field-types.js',

          //place your JavaScript files here
        ]
      }


    },

    watch: {
      options: {
        livereload: 7777
      },
      adminAssets: {
        files: ['admin/app/styles/**/*.css', 'admin/app/scripts/**/*.js', 'admin/app/**/*.html', ],
        tasks: ['concat:adminStyles', 'concat:adminScripts']
      },
      clientAssets: {
        files: ['app/styles/**/*.css', 'app/scripts/**/*.js', 'app/**/*.html', ],
        tasks: ['concat:clientStyles', 'concat:clientScripts']
      },
      protractor: {
        files: ['admin/app/scripts/**/*.js', 'test/e2e/**/*.js'],
        tasks: ['protractor:auto']
      }
    },

    open: {
      devserver: {
        path: 'http://localhost:8888'
      },
      coverage: {
        path: 'http://localhost:5555'
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: true,
        singleRun: false
      },
      unit_coverage: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/scripts/*.js': ['coverage']
        },
        coverageReporter: {
          type: 'html',
          dir: 'coverage/'
        }
      },
    }
  });

  //single run tests
  grunt.registerTask('test', ['jshint', 'test:unit', 'test:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:e2e', ['connect:testserver', 'protractor:singlerun']);

  //autotest and watch tests
  grunt.registerTask('autotest', ['karma:unit_auto']);
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);
  grunt.registerTask('autotest:e2e', ['connect:testserver', 'shell:selenium', 'watch:protractor']);

  //coverage testing
  grunt.registerTask('test:coverage', ['karma:unit_coverage']);
  grunt.registerTask('coverage', ['karma:unit_coverage', 'open:coverage', 'connect:coverage']);

  //installation-related
  grunt.registerTask('install', ['update', 'shell:protractor_install']);
  // grunt.registerTask('updateAdmin', ['concatAdmin']);
  // grunt.registerTask('updateClient', ['concatClient']);

  //defaults
  grunt.registerTask('default', ['clientDev']);

  //development
  // grunt.registerTask('dev', ['update', 'connect:devserver', 'watch:assets']);
  grunt.registerTask('adminDev', ['concat:adminStyles', 'concat:adminScripts', 'connect:devserver', 'watch:adminAssets']);
  grunt.registerTask('clientDev', ['concat:clientStyles', 'concat:clientScripts', 'connect:devserver', 'watch:clientAssets']);

  //server daemon
  grunt.registerTask('serve', ['connect:webserver']);
};