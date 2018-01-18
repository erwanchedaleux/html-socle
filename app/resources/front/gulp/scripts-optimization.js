module.exports = function( gulp, pkg, config ) {
    var uglify, credits, header;

    credits                             = require( '../credits.json' );
    uglify                              = require( 'gulp-uglify' );
    header                              = require( 'gulp-header' );


    gulp.task( 'uglify-main',  function() {
        return gulp
                .src( [
                    config.path.web.js + 'main.js'
                ] )
                .pipe( uglify( {
                    "sourceMap":                   false,
                    "sourceMapIncludeSources":     false
                } ) )
                .pipe( header( credits.main.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );


    gulp.task( 'uglify-scripts',  function() {
        return gulp
                .src( [
                    config.path.web.js + 'scripts.js'
                ] )
                .pipe( uglify( {
                    "sourceMap":                   false,
                    "sourceMapIncludeSources":     false
                } ) )
                .pipe( header( credits.scripts.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );


    gulp.task( 'uglify-lib',  function() {
        return gulp
                .src( [
                    config.path.web.js + 'lib.js'
                ] )
                .pipe( uglify( {
                    "sourceMap":                   false,
                    "sourceMapIncludeSources":     false
                } ) )
                .pipe( header( credits.library.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );


    gulp.task( 'uglify-picturefill',  function() {
        return gulp
                .src( [
                    config.path.web.js + 'polyfill/picturefill.js'
                ] )
                .pipe( uglify( {
                    "sourceMap":                   false,
                    "sourceMapIncludeSources":     false
                } ) )
                .pipe( header( credits.picturefill.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js + 'polyfill/' ) );
    } );


    gulp.task( 'inline-uglify',  function() {
        return gulp
                .src( [
                    config.path.web.system + 'inlinejs-dev.js',
                    config.path.web.system + 'inlinejs-prod.js'
                ] )
                .pipe( uglify( {
                    "sourceMap":                   false,
                    "sourceMapIncludeSources":     false
                } ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );

};
