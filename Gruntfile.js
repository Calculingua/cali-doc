'use strict';

exports = module.exports = function(grunt) {

    grunt.option('src', ['public/src/**/*.js']);
    grunt.initConfig({

        jshint: {
            options: {
                multistr: true,
                eqnull: true,
                force : true,
            },
            source: ['public/src/**/*.js'],
        },
        concat: {
            options: {
                stripBanners: true,
                banner: "/*! Copyright (C) Calculingua - All Rights Reserved \n  Unauthorized copying of this file, via any medium is strictly prohibited \n  Proprietary and confidential \n \n  Author : [William Burke](mailto:wburke@calculingua.com)  \n*/ \n\n",
            },
            build: {
                files: {
                    'public/build/app.js': grunt.option('src'),
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'public/build/app.min.js': ['public/build/app.js'],
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3333,
                    base: "./public",
                    open: {
                        target: "http://localhost:3333/",
                        appName: "open",
                    }
                },
            },
        },
        watch: {
            grunt: {
                files: ["Gruntfile.js"],
                tasks: ["build"]
            },
            jshint: {
                files: grunt.option("src"),
                tasks: ["jshint"]
            
            },
            concat: {
                files: grunt.option("src"),
                tasks: ["concat"]
            },
            uglify: {
                files: ["public/build/app.js"],
                tasks: ["uglify"]
            },
        },

        sass: {
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'public/css/main.css': ['public/sass/**/*.scss'],       // 'destination': 'source'
                }
            }


        },

        rsync: {
            options: {
                exclude: [".git*","*.scss","node_modules", ".sass-cache", 'public/lib', 'public/build', 'bower_components'],
                recursive: true
            },
            beta: {
                options: {
                    src: "./",
                    dest: "/srv/www/beta.help.cali",
                    host: "ajohnson@162.242.210.119",
                    syncDestIgnoreExcl: true,
                    // dryRun: true
                    args: ['--log-file=rsync.log', '--verbose', '--chmod=ugo=rwX'],
                    // privateKey: 'C:\\Users\\aaronj.CORPORATE\\.ssh\\id_rsa'
                }
            },
        }


    });




    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-rsync');


    grunt.registerTask("build", ["jshint", "concat", "uglify", "sass"]);
    grunt.registerTask("default", ["build", "connect", "watch"]);
};
