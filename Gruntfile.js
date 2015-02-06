module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: ['code/static/js/app.js'],
        dest: 'code/static/js/app.min.js'
      }
    },
    cssmin: {
      combine: {
          files: {
            'code/static/css/pack.min.css': ['code/static/css/pack.css']
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