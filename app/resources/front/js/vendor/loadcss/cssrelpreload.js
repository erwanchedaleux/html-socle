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
