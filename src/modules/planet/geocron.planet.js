(function( $, GEOCRON, undefined ) {

// let's register this module
GEOCRON.modules.push({

	/**
	 * Module name.
	 */
	name: 'Planet',

	/**
	 * Initializes the module.
	 */
	initialize: function() {
		if ( ! this.checkPage() ) {
			return false;
		}

		var tables = this.getTables().addClass( 'troops' );
		this.addInfos( tables );
		this.addExport();
	},

	checkPage: function() {
		return $( 'table.second:nth(1)' ).text().indexOf( 'Planète' ) == 1;
	},

	getTables: function() {
		var tables = $();
		$( 'table.secondmanager center' ).each(function() {
			if ( $( this ).text().indexOf( 'Troupes' ) == 0 ) {
				tables = tables.add( $( this ).closest( '.other' ).find( 'table' ) );
			}
		});
		return tables;
	},

	addInfos: function( tables ) {
		tables.each(function() {
			// prepare stats for the table
			var stats = {
				troops: 0,
				pv: 0
			};

			// standard lines will fill the stats
			$( 'tr', this ).each(function() {
				var ally = $( this ).find( 'td:nth(2) font' ).text() || 'F.G.V',
					units = GEOCRON.units[ ally ];
				if ( units !== undefined ) {
					var data = $( this ).find( 'td:first' ).text(),
						count = parseInt( data ),
						name = data.replace( /\d*/, '' ).trim(),
						unit = units[ name ];
					if ( unit !== undefined ) {
						// add info per troop
						var bonus = unit.skill.mod * count / unit.div;
						bonus = bonus > 0 ? Math.ceil( bonus ) : Math.floor( bonus );
						$( this )
							.attr('title', name + '|'
								+ '<p><b>Soldats : </b><tt>' + GEOCRON.formatNumber( count ) + '</tt></p>'
								+ '<p><b>PV : </b><tt>' + GEOCRON.formatNumber( count * unit.pv ) + '</tt></p>'
								+ '<p><b>' + unit.skill.name + ' : </b><tt>' + ( bonus > 0 ? '+' : '' ) + bonus + '</tt></p>'
							)
							.cluetip({
								cluetipClass: 'default troops',
								splitTitle: '|',
								positionBy: 'mouse',
								tracking: true,
								width: 240
							});
						// add to total stats
						stats.troops += count;
						stats.pv += count * unit.pv;
						if ( unit.skill.shared ) {
							ally = '';
						}
						if ( stats[ ally ] === undefined ) {
							stats[ ally ] = {};
						}
						if ( stats[ ally ][ unit.skill.name ] === undefined ) {
							stats[ ally ][ unit.skill.name ] = 0;
						}
						stats[ ally ][ unit.skill.name ] += bonus;
					}
				}
			});

			// last line, added, is the grand total
			var line = $( '<tr class="total">'
				+ '<td>' + GEOCRON.formatNumber( stats.troops ) + ' Total</td>'
				+ '<td>' + GEOCRON.formatNumber( stats.pv ) + ' PV</td>'
				+ '</tr>' );

			var infos = '', factions = [ '' ];
			for ( var i = 0; i < GEOCRON.units.FACTIONS.length; i++ ) {
				factions.push( GEOCRON.units.FACTIONS[i] );
			}
			for ( var i = 0; i < factions.length; i++ ) {
				var faction = factions[i], first = true;
				for ( var j = 0; j < GEOCRON.units.SKILLS.length; j++ ) {
					var skill = GEOCRON.units.SKILLS[ j ], value = stats[ faction ] && stats[ faction ][ skill.name ] || 0;
					if ( value != 0 ) {
						if ( first ) {
							infos += '<hr/>';
							first = false;
							if ( faction != '' ) {
								infos += '<h4 class="' + faction.replace( '.', '', 'g' ) + '">' + faction + '</h4>';
							}
						}
						infos += '<p><b>' + skill.name + ' : </b><tt>' + ( value > 0 ? '+' : '' ) + value + '</tt></p>';
					}
				}
			}

			line
				.attr('title', 'Total|'
					+ '<p><b>Soldats : </b><tt>' + GEOCRON.formatNumber( stats.troops ) + '</tt></p>'
					+ '<p><b>PV : </b><tt>' + GEOCRON.formatNumber( stats.pv ) + '</tt></p>'
					+ infos
				)
				.cluetip({
					cluetipClass: 'default troops',
					splitTitle: '|',
					positionBy: 'mouse',
					tracking: true,
					width: 240
				});

			$( 'tbody', this ).append( line );
		});
	},

	addExport: function() {
		$( '<button type="button" style="position:fixed;left:0;bottom:0">Exporter</button>' ).click(function() {
			var res = '';
			$( 'table.secondmanager center' ).each(function() {
				var txt = $( this ).text();
				if ( txt.indexOf( 'Troupes' ) == 0 ) {
					res += '[b][u]' + txt + '[/b][/u]\n';
					$( this ).closest( '.other' ).find( 'tr' )
						.filter( ':not(.total)' )
							.each(function() {
								$( 'td', this ).each(function() {
									res += $( this ).text() + ' ';
								});
								res += '\n';
							})
						.end()
						.filter( '.total' ).find( 'td:nth(1)' )
							.each(function() {
								res += '\n[i]Total : ' + $( this ).text() + '[/i]\n';
							});
					res += '\n\n';
				}
			});
			alert( res );
		}).appendTo( document.body );
	}

});

})( GEOCRON.jQuery, GEOCRON );