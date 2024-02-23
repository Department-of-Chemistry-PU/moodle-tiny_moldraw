module.exports = function(grunt) {
    // Load required Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // Configure Uglify task
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        minify: {
          options: {
            sourceMap: true,
            sourceMapIncludeSources: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
          },
          files: [{
            expand: true,
            cwd: './amd/src/',
            src: ['*.js'],
            dest: './amd/build/',
            ext: '.min.js',
            extDot: 'last'
          }]
        }
      },
      watch: {
        js: {
          files: ['./amd/src/**/*.js'],
          tasks: ['uglify'],
          options: {
            spawn: false, // Improves performance on some systems
          },
        },
      },
    });
  
    // Register default task
    grunt.registerTask('default', ['uglify', 'watch']);
  
    // Error handling
    grunt.event.on('watch', function(action, filepath, target) {
      if (target === 'js') {
        grunt.log.writeln(filepath + ' has ' + action);
        if (action === 'deleted') {
          grunt.fail.warn(filepath + ' was deleted.');
        }
      }
    });
    
    // Documentation
    // Add comments or documentation here
  };
  