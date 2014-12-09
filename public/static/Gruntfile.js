module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    transport: {
      options: {
        idleading: 'js/',
        debug: false
      },
      build: {
        files: {
          src: ['sjs/modules/**/*.js', 'sjs/pages/**/*.js']
        }
      },
      build2: {
        options: {
          idleading: '',
          debug: false
        },
        files: {
          src: ['sjs/core/**/*.js']
        }
      }
    },

    concat: {

      options: {
        separator: ';',
        include: 'relative'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sjs/pages/',
          src: ['**/*.js'],
          dest: 'js/sjs/pages/'
        }, {
          'js/sjs/core/app.js': ['src/sjs/core/**/*.js']
        }]
      }
    },
    uglify: {
      build: {
        options: {
          compress: true,
          preserveComments: false
        },
        files: [{
          expand: true,
          cwd: 'js/sjs/pages/',
          src: ['**/*.js'],
          dest: 'js/sjs/pages/'
        }, {
          'app.min.js': ['lib/jquery-2.1.1.min.js', 'lib/artTemplate3.js', 'lib/jquery.lettering.js', 'lib/jquery.textillate.js', 'seajs/sea-debug.js', 'seajs/sea.config.js', 'js/sjs/core/app.js']
        }, {
          'app.ie.min.js': ['lib/jquery-1.10.2.min.js', 'lib/artTemplate3.js', 'lib/jquery.lettering.js', 'lib/jquery.textillate.js', 'seajs/sea-debug.js', 'seajs/sea.config.js', 'js/sjs/core/app.js', 'lib/fastClick.js']
        }]
      },
      debug: {
        options: {
          compress: false,
          beautify: true,
          preserveComments: false
        },
        files: [{
          expand: true,
          cwd: 'js/sjs/pages/',
          src: ['**/*.js'],
          dest: 'js/sjs/pages/'
        }, {
          'app.min.js': ['lib/jquery-2.1.1.min.js', 'lib/artTemplate3.js', 'lib/jquery.lettering.js', 'lib/jquery.textillate.js', 'seajs/sea-debug.js', 'seajs/sea.config.js', 'js/sjs/core/app.js']
        }, {
          'app.ie.min.js': ['lib/jquery-1.10.2.min.js', 'lib/artTemplate3.js', 'lib/jquery.lettering.js', 'lib/jquery.textillate.js', 'seajs/sea-debug.js', 'seajs/sea.config.js', 'js/sjs/core/app.js', 'lib/fastClick.js']
        }]
      }
    },
    less: {
      build: {
        options: {
          paths: ["less/app/", "less/app/pages/"],
          yuicompress: true
        },
        files: [{
          "css/main.css": ["less/app/main.less"]
        }, {
          expand: true,
          cwd: 'less/app/pages/',
          src: ['**/*.less'],
          dest: 'css/pages/',
          ext: '.css'
        }]
      }
    },
    shell: {
      cpimg: {
        command: 'cp -r less/app/imgs css/'
      }
    },
    clean: {
      build: ['src'],
      init: ['js', 'css']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['clean:init', 'transport:build', 'transport:build2', 'concat', 'uglify:build', 'less', 'shell', 'clean:build']);
  grunt.registerTask('debug', ['clean:init', 'transport:build', 'transport:build2', 'concat', 'uglify:debug', 'less', 'shell', 'clean:build']);
};