( function() {
    var version, localStorageVersion;

    if ( localStorage && localStorage.getItem( "assets_storage" ) && localStorage.getItem( "assets_storage" ).indexOf( "@version: " ) !== -1 ) {
        version                         = "{{ version }}";
        localStorageVersion             = localStorage.getItem( "assets_storage" ).match( /@version: ([^\\n]+)/ )[1];

        if ( version !== localStorageVersion ) {
            localStorage.removeItem( "assets_storage" );
        }

    }

}() );
