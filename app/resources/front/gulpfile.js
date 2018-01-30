var gulp, config, pkg;


pkg                                     = require( './package.json' );
config                                  = require( './config.json' );
gulp                                    = require( 'gulp' );

// Tasks definitions

require( './gulp/versioncheck' )( gulp, pkg, config  );
require( './gulp/sizereport' )( gulp, pkg, config  );
require( './gulp/clean' )( gulp, pkg, config  );
require( './gulp/twig' )( gulp, pkg, config );
require( './gulp/htmlhint' )( gulp, pkg, config  );
require( './gulp/css' )( gulp, pkg, config  );
require( './gulp/css-optimization' )( gulp, pkg, config  );
require( './gulp/eslint' )( gulp, pkg, config  );
require( './gulp/modernizr' )( gulp, pkg, config  );
require( './gulp/scripts' )( gulp, pkg, config  );
require( './gulp/scripts-optimization' )( gulp, pkg, config  );
require( './gulp/strip-code' )( gulp, pkg, config  );
require( './gulp/watch' )( gulp, pkg, config  );
require( './gulp/notify' )( gulp, pkg, config  );
require( './gulp/version' )( gulp, pkg, config  );
require( './gulp/debug' )( gulp, pkg, config  );
require( './gulp/img-optimization' )( gulp, pkg, config  );

gulp.task( 'htmlhint', gulp.series( 'validateHtml' ) );

gulp.task( 'twig', gulp.series( 'render-html' ) );
gulp.task( 'twig-optimization', gulp.series( 'twig', 'render-html-optimization' ) );

gulp.task( 'css', gulp.parallel( 'allcss', 'inlinecss' ) );
gulp.task( 'css-optimization', gulp.parallel( 'cssmin', 'inline-cssmin' ) );

gulp.task( 'scripts', gulp.parallel( 'browserify', 'browserifyPolyfill', 'concatMain', 'concatLib', 'concatInlineJSDev', 'concatInlineJSProd' ) );
gulp.task( 'scripts-optimization', gulp.parallel( 'uglify-main', 'uglify-scripts', 'uglify-lib', 'uglify-picturefill', 'inline-uglify' ) );

gulp.task( 'img-optimization', gulp.parallel( 'optimize-img' ) );

gulp.task( 'watch', gulp.parallel( 'watchJS_Browserify', 'watchJS_Main', 'watchJS_Lib', 'watchJS_Inline', 'watchStylus', 'watchTwig' ) );
gulp.task( 'default', gulp.series( 'eslint', 'modernizr', 'clean', 'refreshDebugModeDevelop', 'twig', 'validateHtml', 'css', 'scripts', 'notifyBuild' ) );
gulp.task( 'develop', gulp.series( 'default', 'watch' ) );


gulp.task( 'releasePatch', gulp.series( 'eslint', 'modernizr', 'clean', 'css', 'scripts', 'strip-code', gulp.parallel( 'css-optimization', 'scripts-optimization' ), 'notifyRelease', 'versionPatch', 'refreshDebugModeRelease', 'twig-optimization', 'validateHtml', 'sizereport' ) );
gulp.task( 'releaseMinor', gulp.series( 'eslint', 'modernizr', 'clean', 'css', 'scripts', 'strip-code', gulp.parallel( 'css-optimization', 'scripts-optimization' ), 'notifyRelease', 'versionMinor', 'refreshDebugModeRelease', 'twig-optimization', 'validateHtml', 'sizereport' ) );
gulp.task( 'releaseMajor', gulp.series( 'eslint', 'modernizr', 'clean', 'css', 'scripts', 'strip-code', gulp.parallel( 'css-optimization', 'scripts-optimization' ), 'notifyRelease', 'versionMajor', 'refreshDebugModeRelease', 'twig-optimization', 'validateHtml', 'sizereport' ) );
