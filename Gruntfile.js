module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');
  grunt.initConfig({
    copy: {
      build: {
        cwd: 'code',
        src: [ '**' ],
        dest: 'www',
        expand: true
      }
    },
    clean: {
      build: {
        src: [ 'www' ]
      },
      stylesheets: {
        src: [ 'www/static/less' ]
      }
    },
    csslint: {
      lax: {
        options: {
          import: false
        },
        src: ['code/static/css/pack.css']
      }
    },
    jshint: {
        // You get to make the name
      // The paths tell JSHint which files to validate
      all: ['code/static/js/app.js']
      
      
    },
    uglify: {
      build: {
        src: ['code/static/js/app.js'],
        dest: 'code/static/js/app.min.js'
      }
    },
    cssmin: {
      combine: {
          files: {
            'www/static/css/pack.min.css': ['www/static/css/pack.css']
          }
      }
    },
    imagemin: {                          // Task
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'code/static/images',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'www/static/images'                  // Destination path prefix
      }]
    }
  },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "code/static/css/pack.css": "code/static/less/styles.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['code/static/less/*.less','code/static/js/*.js'], // which files to watch
        tasks: ['less','uglify'],
        options: {
          livereload : 9090,
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
 

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', [ 'clean:build', 'jshint','csslint','copy','cssmin','imagemin','clean:stylesheets' ]);
  };