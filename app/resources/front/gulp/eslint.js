module.exports = function( gulp, pkg, config ) {
    var eslintTask;

    eslintTask                          = require( 'gulp-eslint' );

    gulp.task( 'eslint',  function() {
        return gulp
                .src( [
                    config.path.resources.js + '*.js',
                    config.path.resources.js + 'scripts/**/*.js'
                ] )
                .pipe( eslintTask( { "configFile": ".eslintrc" } ) )
                .pipe( eslintTask.format() )
                .pipe( eslintTask.failAfterError() );
    } );
};
