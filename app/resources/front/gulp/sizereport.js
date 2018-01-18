module.exports = function( gulp, pkg, config ) {
    var sizereport;

    sizereport                           = require( 'gulp-sizereport' );


    gulp.task( 'sizereport',  function() {
        return gulp
            .src( [
                config.path.web.js + '**/*.js',
                config.path.web.css + '**/*.css'
            ] )
            .pipe( sizereport( { "gzip": true } ) );
    } );
};
