module.exports = function( gulp, pkg ) {
    var gulpNotify;

    gulpNotify                          = require( 'gulp-notify' );


    function getNotification( message ) {
        return gulp.src( './package.json' )
                .pipe(
                     gulpNotify( {
                         "title":           pkg.title,
                         "message":         message
                     } )
                 );
    }

    gulp.task( 'notifyBuild', function() {
        return getNotification( 'Build done!' );
    } );

    gulp.task( 'notifyRelease', function() {
        return getNotification( 'Release done!' );
    } );

    gulp.task( 'notifyBrowserify', function() {
        return getNotification( 'Browserify done!' );
    } );

    gulp.task( 'notifyConcat', function() {
        return getNotification( 'JS concatenation done!' );
    } );

    gulp.task( 'notifyLib', function() {
        return getNotification( 'JS library done!' );
    } );

    gulp.task( 'notifyInlineJS', function() {
        return getNotification( 'Inline JS done!' );
    } );

    gulp.task( 'notifyStylus', function() {
        return getNotification( 'Stylus done!' );
    } );

};
