(function( $, GEOCRON ) {

// let's register this module
GEOCRON.modules.push({

	/**
	 * Module name.
	 */
	name: 'Plano',

	/**
	 * Initializes the module.
	 */
	initialize: function() {
		if ( ! this.checkPage() ) {
			return false;
		}

		this.addSearch( $( 'table.second:nth(2) table:last' ) );
	},

	checkPage: function() {
		return $( 'table.second:nth(2) center' ).text() == 'Carnet de navigation';
	},

	addSearch: function( targets ) {
		// each line target will be cached for faster retrieval
		var cache = [], coords = /\((\d+)-(\d+)\)\n\[(\d+)-(\d+)\]/, names = /Planète (.*)\nSystème (.*)/;

		// table keeps shaking if size not enforced
		targets.width( targets.width() );

		$( 'tr', targets ).each(function() {
			var coord = coords.exec( $('td:nth(1)', this).text() ),
				name = names.exec( $('td:nth(2)', this).text() );
			if ( coord && coord.length == 5 && name && name.length == 3 ) {
				cache.push({
					label: name[1],
					line: this
				});
			}
		});

		$( '<input type="text" class="search" />' ).keyup($.debounce(100, function() {
			var matcher = new RegExp( '.*' + $(this).val() + '.*', 'i' );
			for ( var i = 0; i < cache.length; i++ ) {
				$( cache[i].line )[ cache[i].label.match(matcher) ? 'show' : 'hide' ]();
			}
		})).prependTo( targets.closest('td') );
	}

});

})( GEOCRON.jQuery, GEOCRON );