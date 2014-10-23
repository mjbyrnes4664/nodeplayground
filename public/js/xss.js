var queryParams;

function getQueryParameter( param ) {
    var queryString = location.search,
        params,
        i,
        l,
        parts;
    if ( !queryParams ) {
        queryParams = {};
        if ( queryString && queryString.length > 1 ) {
            queryString = queryString.substr( 1 );
            params = queryString.split( "&" );
            for ( i = 0, l = params.length; i < l; i++ ) {
                parts = params[ i ].split( "=" );
                /*
                 * '+' is a shorthand for a space so replace it with encoded space %20
                 * Source: http://www.w3.org/Addressing/URL/4_URI_Recommentations.html
                 */
                queryParams[ decodeURIComponent( parts[ 0 ] ) ] = decodeURIComponent( parts[ 1 ].replace( /\+/g, '%20' ) );
            }
        }
    }

    return queryParams[ param ];
}

function getHexCode( char ){
	return char.charCodeAt(0).toString(16);
}

function preventXss( str ) {
	str = str || "";
    str = str.replace( /</g, "&#60;" );
    str = str.replace( />/g, "&#62;" );
    return str;
}

function cleanXSSCharacters( text ){
	var length = text.length,
		i,
		charCode,
		cleanText = "";
	
	for( i = 0; i < length; i++ ){
		charCode = text.charCodeAt( i );
		if( charCode < 256 
				&& !( charCode > 47 && charCode < 58 )
				&& !( charCode > 64 && charCode < 91 )
				&& !( charCode > 96 && charCode < 123) ){
			cleanText += "&#" + charCode + ";";
		} else {
			cleanText += text.charAt( i );
		}
	}
	
	return cleanText;
}

function getCookieValue( cookieName ){
	var cookies = document.cookie.split( /;\s/g ),
		cookie,
		value = "",
		i,
		l = cookies.length;
	
	for( i = 0; i < l; i++ ) {
		cookie = cookies[ i ].split( /=/g );
		if( cookie[ 0 ] === cookieName ) {
			value= decodeURIComponent( cookie[ 1 ] );
			break;
		}
	}
	return value;
}

$( document ).ready( function(){
	$( "#validateButton" ).on( "click", function(e) {
		e.preventDefault();
		$( "#result" ).html( "Your entry '" + $( "#textField" ).val() + "' is invalid");
	} );
	
	$( "#cleanValidateButton" ).on( "click", function(e) {
		e.preventDefault();
		$( "#result" ).html( "Your entry '" + cleanXSSCharacters( $( "#textField" ).val() ) + "' is invalid");
	} );
	
	$( "#validateButton2" ).on( "click", function(e) {
		e.preventDefault();
		$( "#result2" ).html( "<div style='height:50px; width:50px; background-color:" + $( "#textField2" ).val() + ";'></div>");
	} );
	
	$( "#cleanValidateButton2" ).on( "click", function(e) {
		e.preventDefault();
		$( "#result2" ).html( "<div style='height:50px; width:50px; background-color:" + cleanXSSCharacters( $( "#textField2" ).val() ) + ";'></div>");
	} );
	
	$( "#cookieButton" ).on( "click", function(e) {
		e.preventDefault();
		$( "#result3" ).html( "Your bag contains " + getCookieValue( "bagItems" ) + " items");
	} );
	
	$( "#cleanCookieButton" ).on( "click", function(e) {
		e.preventDefault();
		$( "#result3" ).html( "Your bag contains " + cleanXSSCharacters( getCookieValue( "bagItems" ) ) + " items");
	} );
	
	
	
} );
