module.exports = function( gulp, pkg, config ) {
    var clean;

    clean                               = require( 'gulp-clean' );


    gulp.task( 'clean',  function() {
        return gulp
            .src( [
                config.path.web.js + '*.js',
                config.path.web.css + '*.css'
            ], { "read": false } )
            .pipe( clean( { "force": true } ) );
    } );

    gulp.task( 'clean-inlinecss',  function() {
        return gulp
            .src( [
                config.path.web.system + 'inlinecss.css'
            ], { "read": false } )
            .pipe( clean( { "force": true } ) );
    } );

};
