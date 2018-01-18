/*global Buffer */
module.exports = function( imagesFolderPath ){
    return function( style ){
        var fs, stylus, nodes, extname, allowedMimes;
        fs                              = require('fs');
        stylus                          = require( 'stylus' );
        nodes                           = stylus.nodes;
        extname                         = require( 'path' ).extname;

        allowedMimes = {
            ".gif":                         "image/gif",
            ".png":                         "image/png",
            ".jpg":                         "image/jpeg",
            ".jpeg":                        "image/jpeg",
            ".svg":                         "image/svg+xml",
            ".webp":                        "image/webp",
            ".ttf":                         "application/x-font-ttf",
            ".eot":                         "application/vnd.ms-fontobject",
            ".woff":                        "application/font-woff",
            ".woff2":                       "application/font-woff2"
        };


        function embedSVG( filePath, colors ) {
            var source, b64, result, buffer;

            source                      = fs.readFileSync( filePath );
            buffer                      = new Buffer( source ).toString();

            colors.forEach( function( color, index ) {
                var re;

                re                      = new RegExp( '{C' + index + '}', 'g' );
                buffer                  = buffer.replace( re, color.val || color.raw );
            } );

            b64                         = [ 'url("data:image/svg+xml;base64,', new Buffer( buffer ).toString( 'base64' ), '")' ];
            result                      = b64.join( '' );


            return new nodes.Literal( result );
        }



        function embedOther( filePath, mime ) {
            var source, b64, result;

            source                      = fs.readFileSync( filePath );
            b64                         = [ 'url("data:', mime, ';base64,', new Buffer( source ).toString( 'base64' ), '")' ];
            result                      = b64.join( '' );

            return new nodes.Literal( result );

        }



        style.define( 'b64', function( string, color1, color2, color3, color4, color5 ) {
            var filePath, colors, mime, literal, fileExt;

            colors                      = Array.prototype.slice.call( arguments, 1, arguments.length );
            literal                     = new nodes.Literal( 'url("' + string.val + '")' );
            filePath                    = imagesFolderPath + string.val;
            fileExt                     = extname( string.val.toLowerCase() );
            mime                        = allowedMimes[ fileExt ];

            if ( !mime ) {
                return literal;
            }

            // I do it here to avoid a file access if the type mime is not good
            try {
                fs.accessSync( filePath, fs.R_OK );

                if ( fileExt === '.svg' ) {
                    return embedSVG( filePath, colors, mime );
                }

                return embedOther( filePath, mime );

            }
            catch( err ) {
                console.log( '\x1b[31m>> Missing file: \x1b[0m' + err.path );
            }

            return literal;


        } );
    };
};
