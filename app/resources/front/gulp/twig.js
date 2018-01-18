module.exports = function( gulp, pkg, config ) {
    var twig, semver, rename, plumber, filter, htmlbeautify;

    twig                                = require( 'gulp-twig' );
    semver                              = require( 'semver' );
    rename                              = require( 'gulp-rename' );
    plumber                             = require( 'gulp-plumber' );
    filter                              = require( 'gulp-filter' );
    htmlbeautify                        = require( 'gulp-html-beautify' );

    function htmlRendering( version ) {
        return gulp
            .src( [
                config.path.resources.src + '*.twig',
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
                    version: version
                }
            } ) )
            .pipe( rename( { extname: '.html' } ) );
    }

    gulp.task( 'render-html', function() {
        return htmlRendering( Date.now() )
            .pipe( htmlbeautify( {
                    "indent_char": '\t',
                    "indent_size": 1
                } )
            )
            .pipe( gulp.dest( config.path.web.base ) );
        }
    );

    gulp.task( 'render-html-optimization', function() {
        return htmlRendering( pkg.version )
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
