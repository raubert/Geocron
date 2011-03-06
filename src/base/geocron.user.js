// ==UserScript==
// @name GEOCRON scripts
// @namespace http://geocron.enix.org/geowars
// @description Copyright 2011, Angarak - scripts for Geocron
// @include http://geocron.enix.org/geowars/jouer.php
// @version @VERSION
// @resource CSS http://@HOST/geocron/geocron.css
// @resource JQ http://@HOST/geocron/jquery-1.5.1.js
// @resource HOVER http://@HOST/geocron/jquery.hoverIntent.js
// @resource CLUE http://@HOST/geocron/jquery.cluetip.js
// @resource TABLE http://@HOST/geocron/jquery.tablesorter.js
// @resource BASE http://@HOST/geocron/geocron.base.js
// @resource SHIPS http://@HOST/geocron/geocron.ships.js
// @resource UNITS http://@HOST/geocron/geocron.units.js
// @resource SYSTEM http://@HOST/geocron/geocron.system.js
// @resource TARGET http://@HOST/geocron/geocron.target.js
// @resource PLANET http://@HOST/geocron/geocron.planet.js
// @resource LAUNCH http://@HOST/geocron/geocron.launch.js
// ==/UserScript==

var elt = document.createElement( 'style' );
elt.setAttribute( 'type', 'text/css' );
elt.innerHTML = GM_getResourceText( 'CSS' );
document.getElementsByTagName( 'head' )[0].appendChild( elt );

var scripts = [ 'JQ', 'HOVER', 'CLUE', 'TABLE', 'BASE', 'SHIPS', 'UNITS', 'SYSTEM', 'TARGET', 'PLANET', 'LAUNCH' ];

for ( var i = 0; i < scripts.length; i++ ) {
	elt = document.createElement( 'script' );
	elt.setAttribute( 'type', 'text/javascript' );
	elt.setAttribute( 'charset', 'UTF-8' );
	elt.innerHTML = GM_getResourceText( scripts[i] );
	document.getElementsByTagName( 'head' )[0].appendChild( elt );
}
