/**
 * Defines the base attributes and methods used by modules.
 */
(function( $, GEOCRON ) {

/**
 * Script version; for reference purpose.
 */
GEOCRON.version = '@VERSION';

/**
 * Tools container.
 */
GEOCRON.container = null;

/**
 * All modules will be pushed here.
 */
GEOCRON.modules = [];

/**
 * Logging utility based on what's available.
 * 
 * @param message
 *            anything you want to log
 */
GEOCRON.log = typeof console != 'undefined' ? function( message ) { console.log( message ); } : function() {};

/**
 * Main function: initializes all registered modules; this has to be called *after* all modules have been registered.
 */
GEOCRON.initialize = function() {

	var start = new Date().getTime();
	GEOCRON.log( 'GEOCRON: launching script v' + GEOCRON.version + '...' );

	// then initialize the modules
	for ( var i = 0; i < GEOCRON.modules.length; i++ ) {
		GEOCRON.log( 'GEOCRON: initializing "' + GEOCRON.modules[i].name + '" module...' );
		try {
			if ( GEOCRON.modules[i].initialize() === false ) {
				GEOCRON.log( 'GEOCRON: Module "' + GEOCRON.modules[i].name + '" not active on this page.' );
			} else {
				GEOCRON.log( 'GEOCRON: Module "' + GEOCRON.modules[i].name + '" ready.' );
			}
		} catch( e ) {
			GEOCRON.log( 'GEOCRON: Module "' + GEOCRON.modules[i].name + '" failed!' );
			GEOCRON.log( e );
		}
	}
	GEOCRON.log( 'GEOCRON: initialization complete [' + ( new Date().getTime() - start ) + 'ms].' );

};

/**
 * Pretty print for numbers using space as 1K separator.
 * 
 * @param {Number} number
 *            the value to format
 */
GEOCRON.formatNumber = function( number ) {
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
};

GEOCRON.isAlly = function( faction ) {
	return faction == 'F.G.V' || faction == 'E.R.E.L' || faction == 'O.S.G';
};

})( GEOCRON.jQuery, GEOCRON );
