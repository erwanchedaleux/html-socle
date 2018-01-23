module.exports = function( gulp, pkg, config ) {
    var twig, semver, rename, plumber, filter, htmlbeautify, pkge;

    twig                                = require( 'gulp-twig' );
    semver                              = require( 'semver' );
    rename                              = require( 'gulp-rename' );
    plumber                             = require( 'gulp-plumber' );
    filter                              = require( 'gulp-filter' );
    htmlbeautify                        = require( 'gulp-html-beautify' );
    fs                                  = require( 'fs' );


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
            .pipe( twig( {
                data: {
                    version: pkg.version,
                    debug: pkg.debug,
                    maintenance_mode: pkg.maintenance_mode,
                    keywords: pkg.keywords,
                    twitter_name: pkg.twitter_name,
                    locale: pkg.locale,
                    title: pkg.title,
                    domain: pkg.name
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
                    "indent_size": 1
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
                    "max_preserve_newlines": 0,
                    "unformatted": [
                        "style",
                        "script",
                        "noscript"
                    ]
                } )
            )
            .pipe( gulp.dest( config.path.web.base ) );
        }
    );

};
