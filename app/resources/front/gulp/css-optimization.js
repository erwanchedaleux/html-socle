module.exports = function( gulp, pkg, config ) {
    var cssmin, header, credits;

    credits                             = require( '../credits.json' );
    cssmin                              = require( 'gulp-cssmin' );
    header                              = require( 'gulp-header' );

    gulp.task( 'cssmin',  function() {
        return gulp
                .src( [
                    config.path.web.css + '*.css'
                ] )
                .pipe( cssmin( {
                    "advanced":             true,
                    "aggressiveMerging":    true,
                    "compatibility":        false,
                    "keepBreaks":           false,
                    "keepSpecialComments":  0,
                    "mediaMerging":         true,
                    "processImport":        false,
                    "rebase":               false
                } ) )
                .pipe( header( credits.generic.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.css ) );
    } );

    gulp.task( 'inline-cssmin',  function() {
        return gulp
                .src( [
                    config.path.web.system + '*.css'
                ] )
                .pipe( cssmin( {
                    "advanced":             true,
                    "aggressiveMerging":    true,
                    "compatibility":        false,
                    "keepBreaks":           false,
                    "keepSpecialComments":  0,
                    "mediaMerging":         true,
                    "processImport":        false,
                    "rebase":               false
                } ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );

};
