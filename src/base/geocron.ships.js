/**
 * Defines WoG ships.
 */
(function( $, GEOCRON ) {

GEOCRON.ships = {

	'Achila': {
		size: 10
	},
	'Archer': {
		size: 10
	},
	'Doomlight': {
		size: 10
	},
	'Flarekin': {
		size: 10
	},
	'Skyfire': {
		size: 10
	},
	'Voïd-Shark': {
		size: 10
	},
	'Vulture': {
		size: 10
	},

	'Foxhound': {
		size: 20
	},
	'Horsen': {
		size: 20
	},
	'Warthog': {
		size: 20
	},

	'Dragonfly': {
		size: 40
	},
	'Rhinodon': {
		size: 40
	},
	'Werewolf': {
		size: 40
	},

	'Anubis': {
		size: 60
	},
	'Minotaure': {
		size: 60
	}

};

GEOCRON.ships.getSize = function( name ) {
	return GEOCRON.ships[ name ] ? GEOCRON.ships[ name ].size : name;
};

})( GEOCRON.jQuery, GEOCRON );