module.exports = function(grunt) {
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
 

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', [ 'clean:build', 'jshint','csslint','copy','cssmin','clean:stylesheets' ]);
  };