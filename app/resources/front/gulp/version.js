module.exports = function( gulp, pkg, config ) {
    var bump, semver, merge, replace, saveFIle;

    bump                                = require( 'gulp-bump' );
    semver                              = require( 'semver' );
    merge                               = require( 'merge-stream' );

    replace                             = require( 'gulp-replace' );
    savefile                            = require( 'gulp-savefile' );


    function UpdateVersion( newVer ) {
        return merge( [
                    gulp.src( './package.json' )
                        .pipe( bump( { "version": newVer } ) )
                        .pipe( gulp.dest( './' ) ),

                    gulp.src( config.path.web.js + '*.js' )
                        .pipe( bump( { "key": "@version:\\s+", "version": newVer } ) )
                        .pipe( gulp.dest( config.path.web.js ) ),

                    gulp.src( config.path.web.css + '*.css' )
                        .pipe( bump( { "key": "@version:\\s+", "version": newVer } ) )
                        .pipe( gulp.dest( config.path.web.css ) )
            ] );
    }


    gulp.task( 'versionPatch',  function() {
        var newVer = semver.inc( pkg.version, 'patch' );

        return UpdateVersion( newVer );
    } );

    gulp.task( 'versionMinor',  function() {
        var newVer = semver.inc( pkg.version, 'minor' );

        return UpdateVersion( newVer );
    } );

    gulp.task( 'versionMajor',  function() {
        var newVer = semver.inc( pkg.version, 'major' );

        return UpdateVersion( newVer );
    } );
};
