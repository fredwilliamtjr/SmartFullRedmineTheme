module.exports = function (grunt) {
  grunt.initConfig({
    src: 'src/',

    copy: {
      tablericons: {
        expand: true,
        cwd: 'node_modules/@tabler/icons-webfont/dist',
        src: 'tabler-icons.scss',
        dest: 'src/sass/vendor/',
        options: {
          process: function (content, srcpath) {
            return content.replace(/\.\/fonts/g, '../webfonts');
          },
        },
        rename: function (dest, src) {
          return dest + '_' + src;
        }
      },
      fonts: {
        expand: true,
        cwd: 'node_modules/@tabler/icons-webfont/dist/fonts',
        src: 'tabler-icons.*',
        dest: 'webfonts'
      }
    },

    sass: {
      options: {
        implementation: require('sass'),
        sourceMap: false,
        style: 'compressed'
      },

      theme: {
        files: {
          'stylesheets/application.css': '<%= src %>sass/application.scss'
        }
      },

      plugins: {
        files: [
          {
            expand: true,
            cwd: '<%= src %>sass/plugins/',
            src: '**/*.scss',
            dest: 'plugins/',
            ext: '.css',
            extDot: 'last'
          }
        ]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')()
        ]
      },

      all: {
        src: [
          'stylesheets/*.css',
          'plugins/**/*.css'
        ]
      }
    },

    watch: {
      css: {
        files: ['<%= src %>sass/**/*.scss'],
        tasks: ['css']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('@lodder/grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('release', 'Generate dated theme assets and release metadata', function () {
    const fs = require('fs');
    const crypto = require('crypto');
    const css = fs.readFileSync('stylesheets/application.css');
    const js = fs.readFileSync('javascripts/theme.js');
    const day = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date()).replace(/-/g, '');
    const digest = crypto.createHash('sha256').update(css).update(js).digest('hex').slice(0, 12);
    const version = `${day}-${digest}`;
    fs.writeFileSync(`stylesheets/application-${version}.css`, css);
    fs.writeFileSync(`javascripts/theme-${version}.js`, js);
    fs.writeFileSync('theme-release.json', JSON.stringify({ version }, null, 2) + '\n');
    grunt.log.writeln(`SmartFull theme release: ${version}`);
  });

  grunt.registerTask('css', ['copy', 'sass', 'postcss', 'release'])

  grunt.registerTask('default', ['css'])
}
