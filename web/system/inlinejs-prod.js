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

/* global exports */

/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( window ));

/*! CSS rel=preload polyfill. Depends on loadCSS function. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT  */
(function( w ){
    var doc, rp, si, ci, addListener, oldIE, run, loadCSS;
  // rel=preload support test

  loadCSS = w.loadCSS;

  if( !loadCSS ){
    return;
  }

  doc = w.document;
  rp = loadCSS.relpreload = {};
  oldIE = !w.addEventListener;
  si = w.setInterval;
  ci = w.clearInterval;

  addListener = oldIE ? w.attachEvent : w.addEventListener;

  rp.support = function(){
    try {
      return doc.createElement( "link" ).relList.supports( "preload" );
    } catch (e) {
      return false;
    }
  };

  // loop preload links and fetch using loadCSS
  rp.poly = function(){
      var links, i, link;
    links = doc.getElementsByTagName( "link" );
    for( i = 0; i < links.length; i++ ){
      link = links[ i ];
      if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
        loadCSS( link.href, link );
        link.rel = null;
      }
    }
  };

  // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
  if( !rp.support() ){
      rp.poly();
      run = si( rp.poly, 300 );
      addListener( oldIE ? "onload" : "load", function(){
        ci( run );
      } );
  }
}( this ));

/**
 * Site starter
 *
 * Load files (css and js only), store them in the localStorage and insert them in the page.
 *
 * Usage:
 *
 * window.siteStarter.getFiles( [ 'script1.js', 'script2.js', 'style.css' ], insertWithoutWaitingDOMReady );
 *
 * window.siteStarter.getFile( 'script1.js', insertWithoutWaitingDOMReady );
 *
 *
 * insertWithoutWaitingDOMReady = boolean;
 *
 */
( function( global ) {

    function File( immediate ) {

        this.isInserted         = false;
        this.isLoaded           = false;
        // insert without waiting for DOM Ready
        this.immediate          = immediate;


        this.setFromPath = function( path ) {
            var splittedPath;

            this.fullPath                    = path;

            splittedPath                     = path.split( '?' );
            this.path                        = splittedPath[ 0 ];
            this.version                     = splittedPath[ 1 ];

            splittedPath                     = this.path.split( '.' );
            this.extension                   = splittedPath[ splittedPath.length - 1 ];
            this.extension                   = this.extension ? this.extension.toLowerCase() : '';

            return this;
        }


        this.setFromObject = function( data, path ) {
            this.path                        = path;
            this.data                        = data.d;
            this.version                     = data.v;
            this.extension                   = data.e;
            this.fullPath                    = [ path, data.v ].join( '?' );

            return this;
        }


        this.toStore = function() {
            return {
                "v": this.version,
                "d": this.data,
                "e": this.extension
            }
        };


        this.isSameVersion = function( file ) {
            return file.version === this.version;
        };


        function insertScript() {
            var script;

            script                  = document.createElement( 'script' );
            script.type             = 'text/javascript';
            script.text             = this.data;

            document.head.appendChild( script );
        }


        function insertStyle() {
            var style;

            style                   = document.createElement('style');
            style.type              = 'text/css';
            style.innerHTML         = this.data;

            document.head.appendChild( style );
        }


        function insertTagLink() {
            var link;

            link                    = document.createElement( 'link' );
            link.rel                = 'stylesheet';
            link.href               = this.fullPath;

            document.head.appendChild( link );
        }


        function insertTagScript() {
            var script;

            script                  = document.createElement( 'script' );
            script.type             = 'text/javascript';
            script.src              = this.fullPath;

            document.head.appendChild( script );
        }


        this.insertInline = function() {
            if ( this.isInserted ) {
                return;
            }

            this.isInserted = true;

            if ( this.extension === 'js' ) {
                insertScript.call( this );
                return;
            }
            insertStyle.call( this );
        };

        this.insertTag = function() {
            if ( this.isInserted ) {
                return;
            }

            this.isInserted = true;

            if ( this.extension === 'js' ) {
                insertTagScript.call( this );
                return;
            }
            insertTagLink.call( this );
        };
    }




    function SiteStarter () {

        var hasStorage, STORAGE_NAME, storedObject,
            MAX_THREAD, currentThreadNum,
            downloadQueue, insertQueueDOMReady, insertQueueImmediate,
            nbTotalFiles, nbFilesLoaded;

        MAX_THREAD                      = 8;
        currentThreadNum                = 0;
        nbTotalFiles                    = 0;
        nbFilesLoaded                   = 0;
        STORAGE_NAME                    = 'assets_storage';
        hasStorage                      = ( 'localStorage' in window );

        storedObject                    = {};
        downloadQueue                   = [];

        insertQueueDOMReady             = [];
        insertQueueImmediate            = [];

        getStoredObject();


        // Local storage get/set data

        function getStoredObject() {

            if ( !hasStorage ) {
                return;
            }

            if ( localStorage.getItem( STORAGE_NAME ) ) {
                try {
                    storedObject        = JSON.parse( localStorage.getItem( STORAGE_NAME ) );
                }
                catch( e ) {
                    localStorage.removeItem( STORAGE_NAME )
                    storedObject        = {};
                }
            }
        }


        function store() {
            if ( !hasStorage ) {
                return;
            }
            localStorage[ STORAGE_NAME ]    = JSON.stringify( storedObject );
        }



        // Return true if the file is in localStorage AND in the good version
        // (get the data form localStorage and set the file.data whith it)
        // False otherwise
        function checkLocalStorage( file ) {
            var storedData, storedFile;

            storedData              = storedObject[ file.path ];

            // Not in local storage
            if ( !storedData ) {
                return false;
            }

            storedFile              = ( new File() ).setFromObject( storedData );

            // In localStorage AND same version.
            if ( storedFile.isSameVersion( file ) ) {
                // Retrieve the data in the local storage
                file.data           = storedFile.data;
                return true;
            }

            // In localStorage and different version => remove it.
            storedObject[ file.path ] = undefined;

            return false;
        }


        // Insert all scripts
        function insertAll( list ) {
            var index, len;

            len             = list.length;

            if ( !len ) {
                return;
            }

            for ( index = 0; index < len; ++index ) {
                if ( list[ index ].isInserted ) {
                    continue;
                }
                list[ index ].insertInline();
            }

            list.length = 0;

        }


        // Wait for all script to be loaded and for the DOM event
        function checkIfAllFileLoaded() {
            var docState;

            if ( nbTotalFiles > nbFilesLoaded ) {
                return;
            }

            insertAll( insertQueueImmediate );

            docState                        = document.readyState;

            if ( docState === 'interactive' || docState === 'complete' ) {
                insertAll( insertQueueDOMReady );
            }
            else {
                document.addEventListener( "DOMContentLoaded", function() {
                    insertAll( insertQueueDOMReady );
                } );
            }
        }

        // Insert data get from localStorage
        function loadFromStorage( file ) {
            file.isLoaded = true;
            nbFilesLoaded++;
            checkIfAllFileLoaded();
        }


        // Queue a file to load when a thread will be available
        function addToQueue( file ) {
            downloadQueue.push( file );
        }

        // Get next file in the queue
        function getNextFromQueue() {
            if ( downloadQueue.length > 0 ) {
                loadFromServer( downloadQueue.pop() );
            }
        }


        // Try ajax, if fail, insert link or script tags
        function loadFromServer( file ) {
            var xhr;

            if ( currentThreadNum >= MAX_THREAD ) {
                addToQueue( file );
                return;
            }

            currentThreadNum++;

            xhr = new XMLHttpRequest();
            xhr.open( 'GET', file.fullPath, true );

            xhr.onreadystatechange = function () {

                if ( xhr.readyState != 4 ) {
                    return;
                }

                currentThreadNum--;
                nbFilesLoaded++;
                file.isLoaded                   = true;

                getNextFromQueue();

                if ( xhr.status != 200 ) {
                    file.insertTag();
                    return;
                }

                file.data                       = xhr.responseText;
                storedObject[ file.path ]       = file.toStore();

                store();

                checkIfAllFileLoaded();

            };

            xhr.send();
        }


        function addFile( url, immediate ) {
            var file;

            file                 = ( new File( immediate ) ).setFromPath( url );

            // use a queue system to insert the scripts in the same order as they are asked.

            immediate ? insertQueueImmediate.push( file ) : insertQueueDOMReady.push( file );

            if ( hasStorage && checkLocalStorage( file ) ) {
                loadFromStorage( file );
                return;
            }

            loadFromServer( file );
        }


        /**
         * Load a bunch of files
         * immediate: insert without waiting for DOM Ready
         */
        this.getFiles = function getFiles( urls, immediate ) {
            var index, len;

            len                 = urls.length;
            nbTotalFiles        += len;

            for ( index = 0; index < len; index++ ) {
                addFile.call( this, urls[ index ], immediate );
            }

            return this;
        };


        /**
         * Load one of files
         * immediate: insert without waiting for DOM Ready
         */
       this.getFile = function getFile( url, immediate ) {

           nbTotalFiles++;

           addFile.call( this, url, immediate );

           return this;
       };
    }

    global.siteStarter = global.siteStarter || new SiteStarter();

}( window ) );
