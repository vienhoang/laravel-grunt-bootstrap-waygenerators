//Gruntfile
module.exports = function(grunt) {

  //Initializing the configuration object which will enable grunt shortcuts to run specific commands
  // "grunt less" | "grunt concat" etc
  grunt.initConfig({

     // Less file compilation and compression
    less: {
      development: {
          options: {
            compress: true,  //minifying the result
          },
          files: {
            //compiling frontend.less into frontend.css
            "./public/assets/css/frontend.css":"./app/assets/less/frontend.less",
            //compiling backend.less into backend.css
            "./public/assets/css/backend.css":"./app/assets/less/backend.less"
          }
      }
    },

    // JS files concatenation
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/js/frontend.js'
        ],
        dest: './public/assets/js/frontend.js',
      },
      js_backend: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/js/backend.js'
        ],
        dest: './public/assets/js/backend.js',
      },
    },


    // Copy ressources such as fonts, files, images, required by assets to the public directory
    copy : {
        fonts: {
            expand: true,
            cwd : './bower_components/bootstrap/dist/fonts/',
            src: ['*'],
            dest: './public/assets/fonts/'
        }
    },

    // Uglify JS files
    uglify: {
      options: {
        mangle: true,  // Use if you want the names of your functions and variables unchanged
        compress: true
      },
      frontend: {
        files: {
          './public/assets/js/frontend.js': './public/assets/js/frontend.js',
        }
      },
      backend: {
        files: {
          './public/assets/js/backend.js': './public/assets/js/backend.js',
        }
      },
    },

    // Run PHP unit tests
    phpunit: {
      classes: {
          dir: 'app/tests/'   //location of the tests
      },
      options: {
          bin: 'vendor/bin/phpunit',
          colors: true
      }
    },

    // Automatically run tasks when changing JS, LESS or PHP files
    watch: {
      js_frontend: {
        files: [
          //watched files
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/js/frontend.js'
          ],   
        tasks: ['concat:js_frontend','uglify:frontend'],     //tasks to run
        options: {
          livereload: true                        //reloads the browser
        }
      },
      js_backend: {
        files: [
          //watched files
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/js/backend.js'
        ],   
        tasks: ['concat:js_backend','uglify:backend'],     //tasks to run
        options: {
          livereload: true                        //reloads the browser
        }
      },
      less: {
        files: ['./app/assets/less/*.less'],  //watched files
        tasks: ['less'],                          //tasks to run
        options: {
          livereload: true                        //reloads the browser
        }
      },
      tests: {
        files: ['app/controllers/*.php','app/models/*.php'],  //the task will run only when you save files in this location
        tasks: ['phpunit']
      }
    
    }
  });

 // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-phpunit');

  // Task definition
  grunt.registerTask('default', ['watch']);

};