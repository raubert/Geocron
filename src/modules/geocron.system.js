(function( $, GEOCRON ) {

// let's register this module
GEOCRON.modules.push({

	/**
	 * Module name.
	 */
	name: 'System',

	/**
	 * Initializes the module.
	 */
	initialize: function() {
		if ( ! this.checkPage() ) {
			return false;
		}

		var self = this;
		$( 'table.starfield:first' ).one('mouseover', function() {
			self.improveTooltips( this );
		});
	},

	checkPage: function() {
		return $( 'table.starfield:first' ).length == 1;
	},

	getFaction: function( line ) {
		var name = $( line ).find( 'td:nth(4)' );
		if ( name.length == 1 ) {
			return name.text();
		}
		return null;
	},

	splitShips: function( data, test ) {
		var left = [], right = [];

		for ( var i = 0; i < data.length; i++ ) {
			var faction = this.getFaction( data[i] );
			if ( faction != null ) {
				$( data[i] ).addClass( faction.replace( '.', '', 'g' ) );
				( test(faction) ? left : right ).push( data[i] );
			}
		}

		return {
			left: left,
			right: right
		};
	},

	getTableMarkup: function( data ) {
		var markup = '<table>';
		markup += '<tr><th>Vaisseau</th><th>Amiral</th><th>Classe</th><th>Taille</th><th>Faction</th><th colspan="2">Statut</th></tr>';
		for ( var i = 0; i < data.length; i++ ) {
			markup += $( '<div/>' ).append( data[i] ).html();
		}
		markup += '</table>';
		return markup;
	},

	improveTooltips: function( starfield ) {
		var self = this;

		$( 'a', starfield ).each(function() {
			// when the tooltip gets too big...
			var data = $( this ).attr( 'onmouseover' ).toString();
			if ( data.length < 4000 ) {
				return;
			}

			data = data.substring( data.indexOf('<table'), data.lastIndexOf('</table>') + 8 );
			data = data.replace( / (align=\'center\'|style=\'[^\']*\')/g, '' ); // unused attributes
			data = unescape( data.replace( '\\x', '%', 'g' ) ); // escaped UTF-8 chars
			data = $( data ).filter( 'table:last' );

			// filter ships based on alliance
			var split = self.splitShips( $( 'tr', data ), function( name ) {
				return GEOCRON.isAlly( name );
			});
			if ( split.left.length == 0 || split.right.length == 0 ) {
				// re-split by alliance
				var ally = GEOCRON.getAlliance( self.getFaction( split[ split.left.length == 0 ? 'right' : 'left' ][0] ) );
				split = self.splitShips( split[ split.left.length == 0 ? 'right' : 'left' ], function( name ) {
					return GEOCRON.getAlliance( name ) == ally;
				});
			}

			// reorganise data: two tables side by side
			data = '<table class="planet">' + data.end().filter( 'table:first' ).html() + '</table>';
			data += '<div class="left">';
			data += self.getTableMarkup( split.left );
			data += '</div><div class="right">';
			data += self.getTableMarkup( split.right );
			data += '</div><div class="clear"></div>';

			$( this )
			.removeAttr( 'onmouseover' ).removeAttr( 'onmouseout' )
			.attr( 'title', '†' + data )
			.cluetip({
				cluetipClass: 'system',
				showTitle: false,
				splitTitle: '†', // can't use the usual char here: ship names may contain it
				sticky: true,
				closeText: 'X',
				mouseOutClose: true,
				width: 980
			});
		});
	}

});

})( GEOCRON.jQuery, GEOCRON );