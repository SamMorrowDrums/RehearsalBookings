module.exports = function (grunt) {
    'use strict';
    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*'],
        serverJS: ['gruntfile.js', 'app.js', 'config/**/*.js', 'app/**/*.js'],
        clientViews: ['public/modules/**/views/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css'],
        mochaTests: ['app/tests/**/*.js']
    };



    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS.concat(watchFiles.serverJS),
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': '<%= applicationCSSFiles %>'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        'ngAnnotate': {
            options: {},
            production: {
                files: {
                    'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // A Task for loading the configuration object
    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
        //var init = require('./config/init')();
        //var config = require('./config/config');

        //grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        //grunt.config.set('applicationCSSFiles', config.assets.css);
    });

    // Default task(s).
    grunt.registerTask('default', ['npm-install', 'jshint' ,'csslint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin', 'concurrent:default']);

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-ng-annotate');


};
