module.exports = function( gulp, pkg, config ) {
    var stripCode;

    stripCode = require( 'gulp-strip-code' );

    gulp.task( 'strip-code', function() {
        return gulp.src( [
                config.path.web.js + 'scripts.js'
            ] )
            .pipe( stripCode( {
                "start_comment":      "/* start-strip-block */",
                "end_comment":        "/* end-strip-block */"
                } )
            )
            .pipe( gulp.dest( config.path.web.js ) );
    } );
};
