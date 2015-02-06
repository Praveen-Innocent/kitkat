module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: ['static/js/app.js'],
        dest: 'static/js/app.min.js'
      }
    },
    cssmin: {
      combine: {
          files: {
            'static/css/pack.min.css': ['static/css/pack.css']
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
          "static/css/pack.css": "static/less/styles.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['static/less/*.less','static/js/*.js'], // which files to watch
        tasks: ['less','uglify','cssmin'],
        options: {
          livereload : 9090,
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};