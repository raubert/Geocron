(function( $, GEOCRON ) {

// let's register this module
GEOCRON.modules.push({

	/**
	 * Module name.
	 */
	name: 'Target',

	/**
	 * Initializes the module.
	 */
	initialize: function() {
		if ( ! this.checkPage() ) {
			return false;
		}

		var self = this, ships = $('#armement table.second:nth(1) table');
		if ( $('#armement:visible').position().left > 0 ) {
			// already visible
			self.improveList( ships );
		} else {
			$( 'table.second:nth(1) a:contains(Armement)' ).one('click', function() {
				self.improveList( ships );
			});
		}
	},

	checkPage: function() {
		return $( '#armement' ).length == 1;
	},

	improveList: function( ships ) {
		var table = '<table class="targets tablesorter">';
		table += '<thead>';
		table += '<tr><th>Vaisseau</th><th>Amiral</th><th>Taille</th><th>Faction</th><th>Statut</th></tr>';
		table += '</thead>';
		table += '<tbody>';
		$( 'tr', ships ).each(function() {
			var cells = $( 'td', this ), faction = $( 'font:first', cells.eq(3) ).text().replace( /[\[\]]/g, '' );
			table += '<tr class="' + faction.replace( '.', '', 'g' ) + ( GEOCRON.isAlly(faction) ? ' ally' : '' ) + '">';
			table += '<td title="|' + $( '<div/>' ).text( $('font:first', cells.eq(2)).html() ).html().replace( '"', '&quot;', 'g' ) + '">' + $( 'font:first', cells.eq(1) ).html() + '<br/>' + cells.eq( 0 ).html() + '</td>';
			table += '<td>' + $( 'a b', cells.eq(1) ).html() + '</td>';
			table += '<td>' + GEOCRON.ships.getSize( $( 'font:first font:first', cells.eq(2) ).text() ) + '</td>';
			table += '<td>' + faction + '</td>';
			table += '<td>' + ( GEOCRON.isAlly( faction ) ? '[ Allié ]' : $( '<div/>' ).append( $('form', cells.eq(3)).clone() ).html() ) + '</td>';
			table += '</tr>';
		});
		table += '</tbody>';
		table += '</table>';

		table = $( table )
			.find( 'td[title]' )
				.cluetip({
					cluetipClass: 'target',
					splitTitle: '|',
					showTitle: false,
					positionBy: 'mouse',
					tracking: true,
					width: 160
				})
			.end()
			// append first before zebra or it won't be applied
			.appendTo( ships.parent().empty() )
			.tablesorter({
				sortList: [ [2,1], [3,0] ], 
				widgets: [ 'zebra' ]
			});

		$( '<button id="ship-status-recovery">Récupérer le Statut</button>' ).click(function() {
			$( 'form', table ).each(function() {
				var self = $( this );
				$.post('jouer.php', {
					initcombatid: $( 'input[type=hidden]', this ).val(),
					initcombat: 'Combat !'
				}, function( data ) {
					var status = /Abandon : (\d+)% \(actuel : (\d+)%\)/.exec( $(data).find('table.second:nth(2) tr:nth(1) td:nth(1) font:last').text() );
					if ( status.length > 2 ) {
						$( '<div class="status"><div class="current" style="width:' + status[2] + '%"></div><div class="ab" style="width:' + status[1] + '%"></div></div>' )
							.attr( 'title', '|État Courant : <tt>' + status[2] + '%</tt><br/>Abandon : <tt>' + status[1] + '%</tt>' )
							.cluetip({
								cluetipClass: 'target',
								splitTitle: '|',
								showTitle: false,
								positionBy: 'mouse',
								tracking: true,
								width: 160
							})
							.appendTo( self );
					}
				});
			});
		}).insertBefore( table );

		$( '<div id="allied-ships-toggle"><input type="checkbox" id="allied-ships-vis" /><label for="allied-ships-vis">Voir les Vaisseaux Alliés</label></div>' )
		.insertBefore( table )
		.find( 'input' )
			.change(function() {
				$( 'tr.ally', table )[ $(this).attr('checked') ? 'show' : 'hide' ]();
				table.trigger( 'applyWidgets' );
			})
			.change();
	}

});

})( GEOCRON.jQuery, GEOCRON );