/**
 * Defines the base attributes and methods used by modules.
 */
(function( $, GEOCRON ) {

/**
 * Script version; for reference purpose.
 */
var version = '@VERSION',

/**
 * All modules will be pushed here.
 */
modules = [],

/**
 * Logging utility based on what's available.
 * 
 * @param message
 *            anything you want to log
 */
log = typeof console != 'undefined' ? function( message ) { console.log( message ); } : function() {},

/**
 * Contains the user faction.
 */
faction = null;

/**
 * Pretty print for numbers using space as 1K separator.
 * 
 * @param {Number} number
 *            the value to format
 */
function formatNumber( number ) {
	if ( !number ) {
		return number;
	}

	if ( Math.abs( number ) < 1000 ) {
		return Math.round( number * 100 ) / 100;
	}

	var ret = '' + Math.round( number ), differs = true;
	var rgx = /(\d+)(\d{3})/;
	for ( ; ; ) {
		var rep = ret.replace( rgx, '$1 $2' );
		if ( rep == ret ) {
			break;
		}
		ret = rep;
	}
	return ret;
}

/**
 * Tries to guess the user faction based on some mouseover function code.
 * 
 * @return {String} the user faction
 */
function getFaction() {
	if ( faction == null ) {
		faction = $( 'table.second:first td:nth(2) a:nth(2)' ).attr( 'onmouseover' ).toString().replace( /.*\n.*Faction : ([^<]+)<.*\n.*/, '$1' );
	}
	return faction;
}

function getAlliance( faction ) {
	switch( faction ) {
	case 'E.R.E.L':
	case 'F.G.V':
	case 'O.S.G':
		return 'PF';
	case 'C.C.K':
	case 'G.D':
	case 'R.P':
		return 'MOO';
	case 'F.M.U.S':
	case 'P.M':
		return 'PMS';
	default:
		return null;
	}
}

/**
 * Check whether the specified 'other' faction is an ally or not.
 * 
 * @param {String} other
 *            the faction to check
 * @return true if the faction is an ally; else false
 */
function isAlly( other ) {
	return getAlliance( getFaction() ) == getAlliance( other );
}

/**
 * Main function: initializes all registered modules; this has to be called *after* all modules have been registered.
 */
function initialize() {

	var start = new Date().getTime();
	log( 'GEOCRON: launching script v' + version + '...' );

	// then initialize the modules
	for ( var i = 0; i < modules.length; i++ ) {
		log( 'GEOCRON: initializing "' + modules[i].name + '" module...' );
		try {
			if ( modules[i].initialize() === false ) {
				log( 'GEOCRON: Module "' + modules[i].name + '" not active on this page.' );
			} else {
				log( 'GEOCRON: Module "' + modules[i].name + '" ready.' );
			}
		} catch( e ) {
			log( 'GEOCRON: Module "' + modules[i].name + '" failed!' );
			log( e );
		}
	}
	log( 'GEOCRON: initialization complete [' + ( new Date().getTime() - start ) + 'ms].' );

};

/**
 * Expose some public methods and attributes.
 */
$.extend(GEOCRON, {

	formatNumber: formatNumber,

	getFaction: getFaction,
	getAlliance: getAlliance,
	isAlly: isAlly,

	modules: modules,
	initialize: initialize

});

})( GEOCRON.jQuery, GEOCRON );
