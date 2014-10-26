// TODO Clean unminified files
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
            js: {
                src: ['bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/fotorama/fotorama.js',
                    'js/picture_store.js'],
                dest: 'prod/app.js'
            },
            css: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/fotorama/fotorama.css',
                    'css/style.css'
                ],
                dest: 'prod/app.css'
            }
        },

        uglify: {
            js: {
                files: {
                    'prod/app.min.js': ['prod/app.js']
                }
            }
        },

        cssmin: {
            css: {
                files: {
                    'prod/app.min.css': ['prod/app.css']
                }
            }

        },

        watch: {
            options: {
                livereload: true
            },
            js: { files: ['js/**/*'],
                tasks: ['concat', 'uglify']
            },
            less: {
                files: "less/*",
                tasks: ["less",'concat', 'cssmin']
            },
            css: {
                files: "css/*",
                tasks: ['concat', 'cssmin']
            },
            images: {
                files: "images/",
                tasks: ['copy']
            }
        },

        less: {
            development: {
                options: {
                    paths: ["less/"],
                    yuicompress: true
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            }
        },

        copy: {
            custom: {
                expand: true,
                cwd: 'images/',      // Src matches are relative to this path.
                src: ['**/*{.jpg,.png}'], // Actual pattern(s) to match.
                dest: 'prod/images_production/'
            },

            jquery_map: {
                expand: true,
                cwd: 'bower_components/jquery/dist/',
                src: ['jquery.min.map'],
                dest: 'prod/'
            },

            fotorama_images: {
                expand: true,
                cwd: 'bower_components/fotorama/',
                src: ['*.png'],
                dest: 'prod/'
            }
        },

        clean: ["css/"]

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['copy', 'less', 'concat', 'uglify', 'cssmin', 'clean', 'watch']);
    grunt.registerTask('deployment', ['copy', 'less', 'concat', 'uglify', 'cssmin', 'clean']);
    grunt.registerTask('1', ['copy', 'less', 'concat', 'uglify', 'clean', 'watch']);
};