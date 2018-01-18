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
