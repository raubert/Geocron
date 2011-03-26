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

	addBonus: function( stats, ally, skill, bonus ) {
		if ( stats[ ally ] === undefined ) {
			stats[ ally ] = {};
		}
		if ( stats[ ally ][ skill ] === undefined ) {
			stats[ ally ][ skill ] = 0;
		}
		stats[ ally ][ skill ] += bonus;
	},

	setUnitTooltip: function( line, name, unit, count, bonus ) {
		$( line ).attr('title', name + '|'
			+ '<p><b>Soldats : </b><tt>' + GEOCRON.formatNumber( count ) + '</tt></p>'
			+ '<p><b>PV : </b><tt>' + GEOCRON.formatNumber( count * unit.pv ) + '</tt></p>'
			+ '<p><b>' + unit.skill.name + ' : </b><tt>' + ( bonus > 0 ? '+' : '' ) + bonus + '</tt></p>'
		).cluetip({
			cluetipClass: 'default troops',
			splitTitle: '|',
			positionBy: 'mouse',
			tracking: true,
			width: 240
		});
	},

	setTotalTooltip: function( line, stats ) {
		var infos = '', factions = [ '' ];
		for ( var i = 0; i < GEOCRON.units.FACTIONS.length; i++ ) {
			factions.push( GEOCRON.units.FACTIONS[i] );
		}

		for ( var i = 0; i < factions.length; i++ ) {
			var faction = factions[i], first = true;
			for ( var j = 0; j < GEOCRON.units.SKILLS.length; j++ ) {
				var skill = GEOCRON.units.SKILLS[ j ], value = stats[ faction ] && stats[ faction ][ skill.name ];
				if ( value !== undefined ) {
					if ( first ) {
						infos += '<hr/>';
						first = false;
						if ( faction != '' ) {
							infos += '<h4 class="' + faction.replace( '.', '', 'g' ) + '">' + faction + '</h4>';
						}
					}
					if ( value !== 0 ) {
						infos += '<p><b>' + skill.name + ' : </b><tt>' + ( value > 0 ? '+' : '' ) + value + '</tt></p>';
					}
				}
			}
		}

		line.attr('title', 'Total|'
			+ '<p><b>Soldats : </b><tt>' + GEOCRON.formatNumber( stats.troops ) + '</tt></p>'
			+ '<p><b>PV : </b><tt>' + GEOCRON.formatNumber( stats.pv ) + '</tt></p>'
			+ infos
		).cluetip({
			cluetipClass: 'default troops',
			splitTitle: '|',
			positionBy: 'mouse',
			tracking: true,
			width: 240
		});
	},

	addInfos: function( tables ) {
		var self = this;

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
						self.setUnitTooltip( this, name, unit, count, bonus );
						// add to total stats
						stats.troops += count;
						stats.pv += count * unit.pv;
						if ( unit.skill.shared ) {
							self.addBonus( stats, ally, '', 0 );
							ally = '';
						}
						self.addBonus( stats, ally, unit.skill.name, bonus );
					}
				}
			});

			// last line, added, is the grand total
			var line = $( '<tr class="total">'
				+ '<td>' + GEOCRON.formatNumber( stats.troops ) + ' Total</td>'
				+ '<td>' + GEOCRON.formatNumber( stats.pv ) + ' PV</td>'
				+ '</tr>' );
			self.setTotalTooltip( line, stats );

			$( 'tbody', this ).append( line );
		});
	},

	addExport: function() {
		$( '<button type="button">Exporter</button>' ).css({
			bottom: 0,
			left: 0,
			position: 'fixed'
		}).click(function() {
			var res = '';

			// planet name and description
			var title = $( 'table.second:nth(1)' ).text().split( '\n' );
			for ( var i = 0; i < title.length; i++ ) {
				if ( title[i].length > 0 ) {
					if ( res == '' ) {
						res += '\n[b][u]' + title[i] + '[/u][/b]\n';
					} else {
						res += title[i] + '\n';
					}
				}
			}
			res += '\n\n';

			// troops
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

			// buildings
			var buildings = $( 'table.secondmanager:first form' ).text().replace( /- Infrastructure : ([^\d\.\-]*) - ([\d\.]+%)/g, '|$1 - $2\n|' ).split( '|' );
			if ( buildings.length > 2 ) {
				res += '[b][u]Infrastructures[/u][/b]\n';
				for ( var i = 1; i < buildings.length - 1; i++ ) {
					if ( buildings[i].length > 4 ) {
						res += buildings[i];
					}
				}
				res += '\n\n';
			}

			alert( res );
		}).appendTo( document.body );
	}

});

})( GEOCRON.jQuery, GEOCRON );