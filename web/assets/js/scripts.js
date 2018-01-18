/*!
 *  Socle HTML
 *  @author: Erwan Chedaleux
 *  @version: 0.0.1
 *  
*/

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global jQuery, document */
( function() {

    var mainInit;

    mainInit                                = require( './scripts/init/main.js' );


    function init() {
        mainInit();

    }


    jQuery( document ).ready( function() {
        init();
    } );

} ).call( this );

},{"./scripts/init/main.js":3}],2:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    function Cookies( $cookies ) {
        var $btnClose,
            COOKIES_ACTIVE_CLS, COOKIES_NAME, COOKIES_VALUE;

        $btnClose                       = $cookies.find( '.scb-close' );

        COOKIES_ACTIVE_CLS              = 'active';
        COOKIES_NAME                    = 'use_of_cookies';
        COOKIES_VALUE                   = true;

        if ( !$.cookie( COOKIES_NAME ) || $.cookie( COOKIES_NAME ) === false ) {
            $cookies.prependTo( '#main' );
            $cookies.addClass( COOKIES_ACTIVE_CLS );
        }


        function closeCookies() {
            $.cookie( COOKIES_NAME, COOKIES_VALUE, { expires: 365 } );
            $cookies.removeClass( COOKIES_ACTIVE_CLS );
        }


        $btnClose.on( 'click', closeCookies );

    }

    return Cookies;

}( jQuery ) );

},{}],3:[function(require,module,exports){
/* global jQuery */
module.exports = ( function ( $ ) {

    function init() {
        var Cookies,
            $cookies;

        Cookies                                 = require( '../cookies.js' );

        $cookies                                = $( '.site-cookies' );


        if ( $cookies.length ) {
            new Cookies( $cookies );

        }

    }


    return init;

} )( jQuery );

},{"../cookies.js":2}]},{},[1])