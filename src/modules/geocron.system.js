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

	improveTooltips: function( starfield ) {
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
			var ally = [], others = [];
			$( 'tr', data ).each(function() {
				var name = $( this ).find( 'td:nth(4)' );
				if ( name.length == 1 ) {
					$( this ).addClass( name.text().replace( '.', '', 'g' ) );
					if ( GEOCRON.isAlly(name.text()) ) {
						ally.push( this );
					} else {
						others.push( this );
					}
				}
			});

			// reorganise data: two tables side by side
			data = '<table class="planet">' + data.end().filter( 'table:first' ).html() + '</table>';
			data += '<div class="ally"><table>';
			data += '<tr><th>Vaisseau</th><th>Amiral</th><th>Classe</th><th>Taille</th><th>Faction</th><th colspan="2">Statut</th></tr>';
			for ( var i = 0; i < ally.length; i++ ) {
				data += $( '<div/>' ).append( ally[i] ).html();
			}
			data += '</table></div><div class="others"><table>';
			data += '<tr><th>Vaisseau</th><th>Amiral</th><th>Classe</th><th>Taille</th><th>Faction</th><th colspan="2">Statut</th></tr>';
			for ( var i = 0; i < others.length; i++ ) {
				data += $( '<div/>' ).append( others[i] ).html();
			}
			data += '</table></div><div class="clear"></div>';

			$( this )
			.removeAttr( 'onmouseover' ).removeAttr( 'onmouseout' )
			.attr( 'title', '|' + data )
			.cluetip({
				cluetipClass: 'system',
				splitTitle: '|',
				showTitle: false,
				width: 980
			});
		});
	}

});

})( GEOCRON.jQuery, GEOCRON );