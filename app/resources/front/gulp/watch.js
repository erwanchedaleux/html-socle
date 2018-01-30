module.exports = function( gulp, pkg, config ) {

    gulp.task( 'watchJS_Browserify', function() {
        gulp.watch( [
                config.path.resources.js + 'scripts/**/*.js'
            ], gulp.series( 'browserify', 'notifyBrowserify' ) );
    } );

    gulp.task( 'watchJS_Main', function() {
        gulp.watch( [
                config.path.resources.js + 'vendor/modernizr/*.js',
                config.path.resources.js + 'config/starter-config.js'
            ], gulp.series( 'concatMain', 'notifyConcat' ) );
    } );

    gulp.task( 'watchJS_Lib', function() {
        gulp.watch( [
                config.path.resources.js + 'vendor/polyfill/*.js'
            ], gulp.series( 'concatLib', 'notifyLib' ) );
    } );

    gulp.task( 'watchJS_Inline', function() {
        gulp.watch( [
                config.path.resources.js + 'vendor/loadcss/*.js'
            ], gulp.series( 'concatInlineJSDev', 'concatInlineJSProd', 'notifyInlineJS' ) );
    } );

    gulp.task( 'watchStylus', function() {
        gulp.watch( [
                config.path.resources.css + '**/*.styl'
            ], gulp.series( 'allcss', 'inlinecss', 'notifyStylus' ) );
    } );

    gulp.task( 'watchTwig', function() {
        gulp.watch( [
                config.path.resources.src + '**/*.twig'
            ], gulp.series( 'render-html', 'validateHtml', 'notifyTwig' ) );
    } );

};
