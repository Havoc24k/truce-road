module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "css/main.css": "less/main.less" // destination file and source file
                }
            }
        },
        shell: {
            render: {
                command: function() {
                    var ilias = "./ilias.sh";
                    if (process.platform === "win32") {
                        ilias = "ilias.bat";
                    }

                    return [
                        "cd bin",
                        ilias + " create mobile",
                        "cd ..",
                    ].join('&&');
                }
            }
        },
        watch: {
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            index: {
                files: ['index.php'],
                tasks: ['shell:render'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['shell:render'],
                options: {
                    nospawn: true
                }
            },
            templates: {
                files: ['templates/**/*.html'],
                tasks: ['shell:render'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    ////////////////////
    // Load NPM Tasks //
    ////////////////////
    grunt.loadNpmTasks('grunt-shell');

    ////////////////////
    // Register Tasks //
    ////////////////////
    grunt.registerTask('default', ['less', 'shell:render', 'watch']);
};
