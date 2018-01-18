module.exports = function( gulp, pkg, config ) {
    var twig, semver, rename, plumber, filter, htmlbeautify;

    twig                                = require( 'gulp-twig' );
    semver                              = require( 'semver' );
    rename                              = require( 'gulp-rename' );
    plumber                             = require( 'gulp-plumber' );
    filter                              = require( 'gulp-filter' );
    htmlbeautify                        = require( 'gulp-html-beautify' );

    gulp.task( 'render-html', function() {
        return gulp
            .src( [
                config.path.resources.src + '*.njk',
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
                    version: Date.now()
                }
            } ) )
            .pipe( rename( { extname: '.html' } ) )
            .pipe( htmlbeautify( {
                    "indent_char": '\t',
                    "indent_size": 1
                } )
            )
            .pipe( gulp.dest( config.path.web.base ) );
        }
    );

};
