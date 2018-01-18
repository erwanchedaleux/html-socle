module.exports = function( gulp, pkg, config ) {
    var imageminTask, jpegRecompress;

    imageminTask                        = require( 'gulp-imagemin' );
    jpegRecompress                      = require( 'imagemin-jpeg-recompress' );

    gulp.task( 'optimize-img',  function() {
        return gulp
                .src( [
                    config.path.resources.imgNotOptimized + '*',
                ] )
                .pipe( imageminTask( {
                    interlaced: true,
                    progressive: true,
                    optimizationLevel: 5,
                    svgoPlugins: [{removeViewBox: false}]
                } ) )
                .pipe( imageminTask( [
                    imageminTask.gifsicle(),
                    jpegRecompress( {
                        loops:4,
                        min: 80,
                        max: 80
                    } ),
                    imageminTask.optipng(),
                    imageminTask.svgo()
                ] ) )
                .pipe( gulp.dest( config.path.resources.imgOptimized ) );
    } );
};
