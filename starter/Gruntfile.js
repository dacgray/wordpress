module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                loadPath: [
                    'node_modules/foundation-sites/scss',
                    'node_modules/motion-ui/src'
                ]
            },
            dist: {
                files: {
                    "./style.css": "static/style/main.scss"
                }
            }
        },
        watchsass: {
            build: {
                files: [
                    "static/style/*.scss"
                ],
                tasks: [
                    "sass"
                ]
            }
        },
        postcss: {
            autoPrefixer: {
                options: {
                    processors: [
                        require("autoprefixer")({browsers: ["last 2 versions", "ie 8", "ie 9", "Safari 8", "Safari 9"]})
                    ]
                },
                src: "./style.css"
            },
            removeMedia: {
                options: {
                    processors: [
                        require("postcss-remove-media-query-ranges")({min: 0, max: 39.9999999999})
                    ]
                },
                src: "./style.css",
                dest: "./style.mobile.css"
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['*.css', '!*.min.css'],
                        dest: './',
                        ext: '.css'
                    }
                ]
            }
        },
        file_append: {
            default_options: {
                files: [
                    {
                        prepend: "/*\n" +
                        " * Theme Name: Theme Starter\n" +
                        " * Author: SchoolHero.co!\n" +
                        "*/\n",
                        input: "./style.css"
                    }
                ]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'static/dist/main.js': 'static/src/main.es6'
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-replace');

    grunt.renameTask('watch', 'watchsass');

    grunt.registerTask("build", ["sass", "postcss", "babel"]);
    grunt.registerTask("watch", ["sass", "watchsass"]);
    grunt.registerTask("release", ["sass", "postcss", "cssmin", "file_append", "babel"]);

};
