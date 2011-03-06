/**
 * Defines WoG units.
 */
(function( $, GEOCRON ) {

var ATTACK_DICE = {
		name: 'Jet d\'attaque',
		shared: false,
		mod: 1
	},
	ATTACK_BONUS = {
		name: 'Bonus d\'attaque',
		shared: false,
		mod: 1
	},
	ATTACK_OPPONENT = {
		name: 'Jet d\'attaque adverse',
		shared: true,
		mod: -1
	},
	DEFENSE_DICE = {
		name: 'Jet de défense',
		shared: true,
		mod: 1
	},
	DEFENSE_BONUS = {
		name: 'Bonus de défense',
		shared: true,
		mod: 1
	},
	DEFENSE_OPPONENT = {
		name: 'Jet de défense adverse',
		shared: false,
		mod: -1
	},
	DAMAGE_DICE = {
		name: 'Jet de dégâts',
		shared: false,
		mod: 1
	},
	DAMAGE_DICE_BLD = {
		name: 'Jet de dégâts (contre infra.)',
		shared: false,
		mod: 1
	},
	DAMAGE_DICE_POP = {
		name: 'Jet de dégâts (contre pop.)',
		shared: false,
		mod: 1
	},
	DAMAGE_DICE_TRP = {
		name: 'Jet de dégâts (contre troupes)',
		shared: false,
		mod: 1
	},
	DAMAGE_BONUS = {
		name: 'Bonus de dégâts',
		shared: false,
		mod: 1
	},
	DAMAGE_BONUS_TRP = {
		name: 'Bonus de dégâts (contre troupes)',
		shared: false,
		mod: 1
	},
	DAMAGE_OPPONENT = {
		name: 'Jet de dégâts adverse',
		shared: true,
		mod: -1
	};

GEOCRON.units = {};

GEOCRON.units.SKILLS = [
	// attack bonuses (not shared)
	ATTACK_DICE,
	ATTACK_BONUS,
	DEFENSE_OPPONENT,
	DAMAGE_DICE,
	DAMAGE_DICE_BLD,
	DAMAGE_DICE_POP,
	DAMAGE_DICE_TRP,
	DAMAGE_BONUS,
	DAMAGE_BONUS_TRP,

	// defense bonuses (shared)
	ATTACK_OPPONENT,
	DEFENSE_DICE,
	DEFENSE_BONUS,
	DAMAGE_OPPONENT
];

GEOCRON.units.FACTIONS = [
	'C.C.K',
	'E.R.E.L',
	'F.G.V',
	'F.M.U.S',
	'G.D',
	'O.S.G',
	'P.M',
	'R.P'
];

GEOCRON.units[ 'C.C.K' ] = {

	'Miliciens': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Mercenaires': {
		pv: 1,
		skill: DAMAGE_DICE,
		div: 90
	},
	'Agents Yliens': {
		pv: 1,
		skill: DEFENSE_DICE,
		div: 52.5
	},
	'Unitrons': {
		pv: 1,
		skill: DAMAGE_DICE,
		div: 18.75
	},

	'Sentry-Drones': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 0.5
	},
	'Warloïdes': {
		pv: 3,
		skill: DAMAGE_DICE_BLD,
		div: 0.4
	},
	'Chars Securis': {
		pv: 5,
		skill: DEFENSE_BONUS,
		div: 7.5
	},
	'Décurions': {
		pv: 10,
		skill: ATTACK_OPPONENT,
		div: 2
	}

};

GEOCRON.units[ 'E.R.E.L' ] = {

	'Fusiliers': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Sternes': {
		pv: 1,
		skill: DAMAGE_DICE,
		div: 90
	},
	'Aphélions': {
		pv: 1,
		skill: ATTACK_OPPONENT,
		div: 26.25
	},
	'Hyperdines': {
		pv: 1,
		skill: DEFENSE_BONUS,
		div: 18.75
	},

	'Cycleurs': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 0.5
	},
	'Scipions': {
		pv: 3,
		skill: DAMAGE_DICE_BLD,
		div: 0.4
	},
	'Chars Talons': {
		pv: 5,
		skill: DEFENSE_OPPONENT,
		div: 7.5
	},
	'Chars Barn-Owls': {
		pv: 10,
		skill: DAMAGE_BONUS,
		div: 3
	}

};

GEOCRON.units[ 'F.G.V' ] = {

	'Fédérés': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Soldats dynastiques': {
		pv: 1,
		skill: DEFENSE_OPPONENT,
		div: 90
	},
	'Interdictes': {
		pv: 1,
		skill: DAMAGE_OPPONENT,
		div: 42
	},
	'Centurions': {
		pv: 1,
		skill: ATTACK_BONUS,
		div: 18.75
	},

	'Guardians': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 0.5
	},
	'Magisterus': {
		pv: 3,
		skill: ATTACK_OPPONENT,
		div: 9
	},
	'Chars Monarques': {
		pv: 5,
		skill: DAMAGE_DICE,
		div: 12
	},
	'Chars Hégémons': {
		pv: 10,
		skill: DAMAGE_BONUS,
		div: 3
	}

};

GEOCRON.units[ 'F.M.U.S' ] = {

	'Marines': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Steel Troopers': {
		pv: 1,
		skill: DAMAGE_DICE_TRP,
		div: 72
	},
	'Commandos': {
		pv: 1,
		skill: ATTACK_OPPONENT,
		div: 26.25
	},
	'Remno-Censeurs': {
		pv: 1,
		skill: ATTACK_BONUS,
		div: 25
	},

	'Manbots': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 0.5
	},
	'Chars Strikers': {
		pv: 3,
		skill: DAMAGE_OPPONENT,
		div: 11.25
	},
	'Chars Enforcers': {
		pv: 5,
		skill: DEFENSE_OPPONENT,
		div: 12
	},
	'Obstructors': {
		pv: 10,
		skill: DAMAGE_BONUS,
		div: 3
	}

};

GEOCRON.units[ 'G.D' ] = {

	'Asservis': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Gardes noirs': {
		pv: 1,
		skill: DAMAGE_DICE,
		div: 90
	},
	'Powerlords': {
		pv: 1,
		skill: DAMAGE_DICE_BLD,
		div: 1.5
	},
	'Exo-Armorius': {
		pv: 1,
		skill: ATTACK_BONUS,
		div: 25
	},

	'Gladius APC': {
		pv: 2,
		skill: DAMAGE_DICE,
		div: 30
	},
	'Reductors': {
		pv: 3,
		skill: DAMAGE_DICE_POP,
		div: 1 / 4.5
	},
	'Chars Ombraks': {
		pv: 5,
		skill: DEFENSE_OPPONENT,
		div: 12
	},
	'Dominators': {
		pv: 10,
		skill: DAMAGE_BONUS,
		div: 3
	}

};

GEOCRON.units[ 'O.S.G' ] = {

	'Résistants': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Sapeurs': {
		pv: 1,
		skill: DAMAGE_DICE_BLD,
		div: 1.8
	},
	'Infiltrateurs': {
		pv: 1,
		skill: DEFENSE_DICE,
		div: 84
	},
	'Nova-warriors': {
		pv: 1,
		skill: DAMAGE_DICE_TRP,
		div: 18.75
	},

	'Powerbikes': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 1 / 3
	},
	'Assault-engines': {
		pv: 3,
		skill: DAMAGE_DICE,
		div: 22.5
	},
	'Chaoticors': {
		pv: 5,
		skill: DEFENSE_OPPONENT,
		div: 12
	},
	'Freedom Wartanks': {
		pv: 10,
		skill: ATTACK_OPPONENT,
		div: 2
	}

};

GEOCRON.units[ 'P.M' ] = {

	'Conscrits': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Lanciers du Protectorat': {
		pv: 1,
		skill: DAMAGE_DICE_TRP,
		div: 90
	},
	'Cyberiens': {
		pv: 1,
		skill: ATTACK_OPPONENT,
		div: 42
	},
	'Paladins': {
		pv: 1,
		skill: DEFENSE_BONUS,
		div: 25
	},

	'Red Sparrows': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 0.5
	},
	'Ravenlocks': {
		pv: 3,
		skill: ATTACK_OPPONENT,
		div: 11.25
	},
	'Chars Jadalys': {
		pv: 5,
		skill: DAMAGE_DICE_BLD,
		div: 1 / 3.5
	},
	'Warmongers': {
		pv: 10,
		skill: DAMAGE_BONUS,
		div: 3
	}

};

GEOCRON.units[ 'R.P' ] = {

	'Mitrailleurs': {
		pv: 1,
		skill: ATTACK_DICE,
		div: 90
	},
	'Astralys': {
		pv: 1,
		skill: DEFENSE_DICE,
		div: 90
	},
	'Carmines': {
		pv: 1,
		skill: DEFENSE_DICE,
		div: 42
	},
	'Duskers': {
		pv: 1,
		skill: DAMAGE_BONUS_TRP,
		div: 25
	},

	'Olerios': {
		pv: 2,
		skill: DAMAGE_DICE_POP,
		div: 0.5
	},
	'Fulcrums': {
		pv: 3,
		skill: DAMAGE_DICE_TRP,
		div: 18
	},
	'Dawnbringers': {
		pv: 5,
		skill: ATTACK_OPPONENT,
		div: 6
	},
	'Chars Sunfall': {
		pv: 10,
		skill: DEFENSE_BONUS,
		div: 3
	}

};

})( GEOCRON.jQuery, GEOCRON );