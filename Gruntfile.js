module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // compile sass
        sass: {
            options: {
                style: 'expanded'
                    //lineNumbers: true
            },
            dist: {
                files: {
                    'dev/assets/css/default.noprefix.css': 'dev/assets/sass/default.sass',
                    'dev/assets/css/smart.noprefix.css': 'dev/assets/sass/smart.sass',
                }
            }
        },

        // add vendor-specific prefixes from Can I Use
        autoprefixer: {
            options: {
                browsers: ["ie 9", "last 2 versions"]
            },
            default: {
                src: "dev/assets/css/default.noprefix.css",
                dest: "dist/assets/css/default.css"
            },
            smart: {
                src: "dev/assets/css/smart.noprefix.css",
                dest: "dist/assets/css/smart.css"
            }
        },

        // css min
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/assets/css',
                    ext: '.min.css'
                }]
            }
        },

        // watch
        watch: {
            options: { livereload: true },
            css: {
                files: ["dev/assets/sass/**/*", "dist/*"],
                tasks: ["sass", "autoprefixer"]
            }
        },

        // configure live reload
        livereload: {
            options: {
                base: 'site',
            },
            files: ['site/**/*']
        }
    });

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask("default", ["production"]);
    grunt.registerTask("production", ["sass", "autoprefixer", "cssmin", "watch", "livereload"]);
};
