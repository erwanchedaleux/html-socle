module.exports = function( gulp ) {
    var modulesVersionCheck;

    modulesVersionCheck                     = require( 'npm-check-updates' );

    gulp.task( 'versioncheck',  function() {
        return modulesVersionCheck.run( {
            "packageFile":                  "package.json",
            "silent":                       true,
            "jsonUpgraded":                 true,
            "upgrade":                      false
        } ).then( function( toUpgrade ) {
            var upd, hasUpdate;

            for ( upd in toUpgrade ) {
                if ( toUpgrade.hasOwnProperty( upd ) ) {
                    hasUpdate = true;
                    break;
                }
            }

            if ( hasUpdate ) {
                console.log( '\x1b[32m>>>\x1b[0m Dependencies to upgrade:\n\n', toUpgrade );
            }
            else {
                console.log( '\x1b[32m>>>\x1b[0m Everything is \x1b[32mup to date!\x1b[0m' );
            }
        } );
    } );
};
