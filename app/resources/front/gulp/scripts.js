module.exports = function( gulp, pkg, config ) {
    var browserify, gulpConcat, /*projectVars, */stringifyOptions, credits, header;

    // projectVars                         = require( '../data/variables.json' );
    browserify                          = require( 'gulp-browserify' );
    gulpConcat                          = require( 'gulp-concat' );
    credits                             = require( '../credits.json' );
    header                              = require( 'gulp-header' );

    stringifyOptions                    = [ "stringify",
        {
            "extension":                                ".html",
            "minify":                                   true,
            "minifier": {
                "extensions":                           [ '.html' ],
                "options": {
                    "removeComments":                   true,
                    "removeCommentsFromCDATA":          true,
                    "removeCDATASectionsFromCDATA":     true,
                    "collapseWhitespace":               true,
                    "conservativeCollapse":             false,
                    "preserveLineBreaks":               false,
                    "collapseBooleanAttributes":        false,
                    "removeAttributeQuotes":            true,
                    "removeRedundantAttributes":        false,
                    "useShortDoctype":                  false,
                    "removeEmptyAttributes":            false,
                    "removeScriptTypeAttributes":       false,
                    "removeStyleLinkTypeAttributes":    false,
                    "removeOptionalTags":               false,
                    "removeIgnored":                    false,
                    "removeEmptyElements":              false,
                    "lint":                             false,
                    "keepClosingSlash":                 false,
                    "caseSensitive":                    false,
                    "minifyJS":                         false,
                    "minifyCSS":                        false,
                    "minifyURLs":                       false
                }
            }
        }
    ];

    gulp.task( 'browserify',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'scripts.js'
                ] )
                .pipe( browserify( {
                    "transform": [
                        stringifyOptions
                    ],
                    "external":                                             []
                } ) )
                .pipe( header( credits.scripts.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );

    gulp.task( 'browserifyPolyfill',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/polyfill/picturefill.js'
                ] )
                .pipe( browserify( {
                    "transform": [
                        stringifyOptions
                    ],
                    "external":                                             []
                } ) )
                .pipe( header( credits.picturefill.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js + 'polyfill/' ) );
    } );



    gulp.task( 'concatMain',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/modernizr/modernizr.js',
                    config.path.resources.js + 'vendor/modernizr/addons.js',
                    config.path.resources.js + 'vendor/modernizr/old-browser-redirect.js',
                    config.path.resources.js + 'config/starter-config.js'
                ] )
                .pipe( gulpConcat( 'main.js' ) )
                .pipe( header( credits.main.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );



    gulp.task( 'concatLib',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/polyfill/polyfill.js',
                    config.path.resources.js + 'vendor/plugins/jquery.js',
                    config.path.resources.js + 'vendor/plugins/jquery.cookie.js',
                    config.path.resources.js + 'vendor/plugins/lazysizes.js'
                ] )
                .pipe( gulpConcat( 'lib.js' ) )
                .pipe( header( credits.library.join( '\n *  ' ), pkg ) )
                .pipe( gulp.dest( config.path.web.js ) );
    } );

    gulp.task( 'concatInlineJSDev',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'vendor/loadcss/loadCSS.js',
                    config.path.resources.js + 'vendor/loadcss/cssrelpreload.js'
                ] )
                .pipe( gulpConcat( 'inlinejs-dev.js' ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );



    gulp.task( 'concatInlineJSProd',  function() {
        return gulp
                .src( [
                    config.path.resources.js + 'config/check-version.js',
                    config.path.resources.js + 'vendor/loadcss/loadCSS.js',
                    config.path.resources.js + 'vendor/loadcss/cssrelpreload.js',
                    config.path.resources.js + 'config/starter.js'
                ] )
                .pipe( gulpConcat( 'inlinejs-prod.js' ) )
                .pipe( gulp.dest( config.path.web.system ) );
    } );

};
