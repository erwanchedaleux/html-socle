module.exports = function( gulp, pkg, config ) {
    var htmlhint, fancyLog, colors;

    htmlhint                            = require( 'gulp-htmlhint' );


    gulp.task( 'validateHtml', function() {
        return gulp
            .src( [
                config.path.web.base + '*.html'
            ] )
            .pipe( htmlhint( '.htmlhintrc' ) )
            .pipe( htmlhint.reporter() );

        }
    );

};
