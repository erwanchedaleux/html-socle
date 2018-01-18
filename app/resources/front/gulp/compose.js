module.exports = function( gulp, pkg, config ) {
    var savefile;

    savefile                        = require( 'gulp-savefile' );


    gulp.task( 'compose',  function() {
        return gulp
            .src( './../../config/config.yml' )
            .pipe( savefile() );
    } );

};
