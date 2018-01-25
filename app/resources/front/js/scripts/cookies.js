/* global jQuery */
module.exports = ( function ( $ ) {

    function Cookies( $cookies ) {
        var $btnClose,
            COOKIES_ACTIVE_CLS, COOKIES_NAME, COOKIES_VALUE;

        $btnClose                       = $cookies.find( '.sco-close' );

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
