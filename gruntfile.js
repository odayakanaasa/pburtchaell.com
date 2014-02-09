/* Patrick Burtchaell - User interface designer, videographer, & outdoorsman
 * http://www.pburtchaell.com/ - http://twitter.com/pburtchaell
 *
 *
 * Copyright (c) 2014 Patrick Burtchaell, http://pburtchaell.com/legal
 * Licensed under the MIT license, http://pb.mit-license.org/
 */

module.exports = function(grunt) {

  'use strict';
  
	grunt.initConfig({ 
 
		pkg:grunt.file.readJSON('package.json'),
    aws:grunt.file.readJSON('aws.json'),
		site:grunt.file.readYAML('src/data/site.yml'),
        
    /*
     * clean <% site.build %> & <% site.release %>
     * this will remove all old files before creating the new files
     */
    clean: {
      build: ['./dist'],
      development: ['<%= site.development %>'],
      production: ['<%= site.production %>']
    },
    
    /*
    * copy 
    */
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: '<%= site.source %>/less/',
            src: ['fonts/**'], 
            dest: '<%= site.development %>/assets/css/', 
          },
          {
            expand: true,
            cwd: '<%= site.source %>/',
            src: ['img/**'], 
            dest: '<%= site.development %>/assets/'
          },
          {
            expand: true,
            cwd: '<%= site.source %>/',
            src: ['img/**'], 
            dest: '<%= site.production %>/assets/'
          }
        ]
      }
    },
        
		/*
		 * compile SCSS (LESS) to CSS
		 */
    less: {
      options: {
        banner: '/*<%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
        compress: true,
        metadata: '<%= site.source %>/less/data/*.{json,yml}'
      },
      assets: {
        files: {
          '<%= site.development %>/assets/css/styles.css' : '<%= site.source %>/less/styles.less',
        }
      }
    },
			
		/*
		 * spell check all published content on blog
		 */
		spell: {
      blog: {
		    src: ['<%= site.content %>/blog/published/*.{md,hbs}'],
        options: {
          lang: 'en',
          ignore: ['cliches', 'double negatives']
        }
			}
    },
		
		/*
		 * minify JS
		 */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      assets: {
        files: {
          '<%= site.development %>/assets/js/components.js' : 
          [
          '<%= site.components %>/responsive-nav/client/dist/responsive-nav.js',
          '<%= site.components %>/headroom.js/dist/headroom.js',
          '<%= site.components %>/vendor/echo.js'
          ],
          '<%= site.development %>/assets/js/highlight.js' : 'bower_components/vendor/highlight.pack.js'
        }
      }
    },
        
    /*
     * compress files
     */
    compress: {
      options: {
        mode: 'gzip',
        level: 9
      },
      stylesheets: {
        expand: true,
        cwd: '<%= site.development %>/assets/',
        dest: '<%= site.production %>/assets/',
        src: ['**/*.css'],
        ext: '.css',
      },
      javascripts: {
        expand: true,
        cwd: '<%= site.development %>/assets/',
        dest: '<%= site.production %>/assets/',
        src: ['**/*.js'],
        ext: '.js',
      },
      content: {
        expand: true,
        cwd: '<%= site.development %>/',
        dest: '<%= site.production %>/',
        src: ['**/*.html'],
        ext: '.html'
      },
      fonts: {
        expand: true,
        cwd: '<%= site.development %>/',
        src: ['assets/css/fonts/**/*'],
        dest: '<%= site.production %>/assets/css/fonts/'
      }
    },
		
		/* 
		 * assemble the site
		 */	
		assemble: {
		
			options: {
				flatten: true,
				data: ['<%= site.source %>/data/*.{json,yml}', 'package.json'],
				assets: '<%= site.development %>/assets',
				helpers: ['helper-compose','handlebars-helper-moment','<%= site.source %>/helpers/*.js'],
				partials: [
          '<%= site.templates %>/partials/**/*.{hbs,md}', // partials are always used on every page (i.e. header, footer, navigation, etc.)
          '<%= site.templates %>/snippets/**/*.{hbs,md}'  // snippets are only used occasionally (i.e. branding, social media links, etc.)
        ],
				plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap','assemble-related-pages'],
				layoutdir: '<%= site.templates %>/layouts',
				layout: 'default.hbs',
				ext: '<%= site.extension %>',
			},
			
			// assemble general pages
			site: {
        options: {	
          plugins: ['assemble-contrib-permalinks'],
          permalinks: {
            structure: ':shortName/index.html'
          },
          sitemap: {
            homepage: '<%= site.url %>',
            changefreq: 'weekly',
            priority: '0.8',
            robot: true
          },
          compose: { cwd: '<%= site.content %>/blog/', sep: '<!-- /article -->' },
				},
                
				files: [ 
					{
						src: ['<%= site.content %>/*.{hbs,md}'],
						dest: '<%= site.development %>/'
					}
				]
			},
			
			// assemble blog
			blog: {
				options: {	
          plugins: ['assemble-contrib-permalinks'],
          permalinks: { structure: ':pubYear/:shortName/index.html' },
          layout: 'layout-blog.hbs',
          compose: { cwd: '<%= site.content %>/blog/', sep: '<!-- /article -->' },
        },
				files: [ 
					{
          src: ['<%= site.content %>/blog/published/**/*.{hbs,md}'],
				  dest: '<%= site.development %>/blog/'
					},
          {
				  src: ['<%= site.content %>/blog/index.hbs'],
				  dest: '<%= site.development %>/blog/index.html'
					}
				]
			},
      
      // assemble portfolio
      portfolio: {   
        options: {
          plugins: ['assemble-contrib-permalinks'],
          permalinks: { structure: ':year/:shortName/index.html' },
          //layout: 'layout-portfolio.hbs'
        },     
        files: [
          /*{
          src: ['<%= site.content %>/portfolio/published/*.json'],
          dest: '<%= site.development %>/work/'
          },*/
          {
           src: ['<%= site.content %>/portfolio/index.hbs'],
           dest: '<%= site.development %>/work/',
          }
        ]        
      }
    },	

		
    /*
    * watch files for changes
    */
    watch: {
      dev: {
        files: [
          '<%= site.source %>/**/*.{js,less,hbs}',
          '<%= site.content %>/**/*.{html,hbs,md,json,yml}'
        ],
        tasks: [
          'less',
          'uglify',
          'assemble'
        ],
        options: {
          spawn: false,
          interrupt: true,
          livereload: true,
        }
      }
    },
		
		
    /*
    * start local server
    */			 
    connect: {
      dev: {
        options: {
          port: 35729,
          open: true,
          base: '<%= site.development %>/'
        }
      }
    },
        
    /*
     * deploy to AWS S3
     */
    /*aws_s3: {
      options: {
        accessKeyId: '<%= aws.auth.key %>',
        secretAccessKey: '<%= aws.auth.secret %>',
        uploadConcurrency: 5, 
        downloadConcurrency: 5
      }, 
      production: {
        options: {
          bucket: '<%= aws.bucket.production %>',
          params: {
            ContentEncoding: 'gzip'
          }
        },
        files: [
          { 
            expand: true, 
            cwd: '<%= site.development %>', 
            src: ['**'], 
            dest: 'test/' 
          },
          { 
            expand: true, 
            cwd: '<%= site.development %>/assets', 
            src: ['**'], 
            dest: 'test/assets/', 
            params: { 
              CacheControl: '2000' 
            } 
          },
        ]
      }    
    },
          
    s3: {
      options: {
        key: '<%= aws.auth.key %>',
        secret: '<%= aws.auth.secret %>',
        access: 'public-read',
        gzip: true, 
        gzipExclude: ['.jpg', '.png', '.gif'],
        headers: {
          // two week cache policy (1000 * 60 * 60 * 48)
          "Cache-Control": "max-age=172800000, public",
          "Content-Encoding": "gzip",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },
      
      // dev.pburtchaell.com bucket 
      staging: {
        options: {
          encodePaths: true,
          bucket: '<%= aws.bucket.staging %>'
        },
        upload: [
          { src: '<%= site.development %>/', dest: './' }
        ]
      },
      
      // pburtchaell.com bucket 
      production: {
        options: {
          bucket: '<%= aws.bucket.production %>'
        },
        upload: [
          { src: '<%= site.development %>/*.html', dest: 'aws-test/*.html'}
        ]
      }
      
    }*/
    
	});
	
	
  /*
   * plugins, such wow
   */
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-spell');
  //grunt.loadNpmTasks('grunt-s3');
  //grunt.loadNpmTasks('grunt-aws-s3');
  
  grunt.registerTask('congrats', 'Log some stuff', function() {
    grunt.log.write('Congrats your site has been assembled.').ok();
  });
	
	/* 
	 * tasks
	 */
  grunt.registerTask('deploy-staging', ['s3:staging']); // deploy the site to the dev.pburtchaell.com bucket
  grunt.registerTask('deploy-production', ['s3:production']); // deploy the site to the pburtchaell.com bucket
  grunt.registerTask('default', ['assemble','connect:production']);	
  grunt.registerTask('dev', ['connect:dev','watch:dev']);
	grunt.registerTask('build', [
    /*
     * BUILD TASKS:
     * 
     * 1. Clean ./dist directory
     * 2. Assemble HTML files to ./dist/development
     * 3. Compile minified stylesheets to .dist/development/assets/css
     * 4. Compile uglified scripts to ./dist/development/assets/js
     * 5. Copy font files to ./dist/development/assets/css/fonts
     * 6. Compress (using gzip) all files in assets/ and move to ./dist/production/assets
     * 7. Compress (using gzip) all HTML and move to ./dist/production
     * 
     * Files within the production folder will be compressed and ready to upload to the server.
     * Files within the development folder will not be compressed.
     * 
     */
    'clean:build',
    'assemble',
    'less:assets',
    'uglify:assets',
    'copy:assets',
    'compress:stylesheets',
    'compress:javascripts',
    'compress:fonts',
    'compress:content',
    'congrats'
	]);
    
}