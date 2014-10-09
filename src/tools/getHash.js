// parse hash
var querystring = require('querystring');

function parse(hash) {
	var hash = hash ? hash : window.location.hash;
	// remove #
	hash = hash.split('#').pop();

	return querystring.parse(hash);
}

module.exports.parse = parse