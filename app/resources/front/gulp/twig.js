module.exports = function( gulp, pkg, config ) {
    var twig, semver, rename, plumber, filter, htmlbeautify, debug, fs, htmlmin, outputNameFile;

    twig                                = require( 'gulp-twig' );
    semver                              = require( 'semver' );
    rename                              = require( 'gulp-rename' );
    plumber                             = require( 'gulp-plumber' );
    filter                              = require( 'gulp-filter' );
    htmlbeautify                        = require( 'gulp-html-beautify' );
    debug                               = require( 'gulp-debug' );
    fs                                  = require( 'fs' );
    htmlmin                             = require( 'gulp-htmlmin' );

    outputNameFile                      = '';


    function htmlRendering( pkg ) {
        return gulp
            .src( [
                config.path.resources.src + '*.twig'
            ] )
            .pipe( plumber() )
            .pipe( filter( [
                config.path.resources.src + '*.twig',
                config.path.resources.src + '*/**.twig',
                '!' + config.path.resources.src + '_*.twig',
                '!' + config.path.resources.src + '*/_*.twig'
            ] ) )
            .pipe(
                rename( function( path ) {
                    outputNameFile      = path.basename + '.html';
                } )
            )
            .pipe( twig( {
                data: {
                    version: pkg.version,
                    debug: pkg.debug,
                    maintenance_mode: pkg.maintenance_mode,
                    keywords: pkg.keywords,
                    twitter_name: pkg.twitter_name,
                    locale: pkg.locale,
                    title: pkg.title,
                    description: pkg.description,
                    domain: pkg.name,
                    page: function () {
                        return outputNameFile;
                    }
                }
            } ) )
            .pipe( rename( { extname: '.html' } ) );
    }

    gulp.task( 'render-html', function() {
        pkg                             = JSON.parse( fs.readFileSync( './package.json' ) );
        pkg.version                     = Date.now();

        return htmlRendering( pkg )
            .pipe( htmlbeautify( {
                    "indent_char": '\t',
                    "indent_size": 1,
                    "end_with_newline": true
                } )
            )
            .pipe( gulp.dest( config.path.web.base ) );
        }
    );

    gulp.task( 'render-html-optimization', function() {
        pkg                             = JSON.parse( fs.readFileSync( './package.json' ) );

        return htmlRendering( pkg )
            .pipe( htmlbeautify( {
                    "indent_char": '\t',
                    "indent_size": 1,
                    "end_with_newline": true,
                    "max_preserve_newlines": 0,
                    "unformatted": [
                        "style",
                        "script",
                        "noscript"
                    ]
                } )
            )
            .pipe( htmlmin( { collapseWhitespace: true } ) )
            .pipe( gulp.dest( config.path.web.base ) );
        }
    );

};
