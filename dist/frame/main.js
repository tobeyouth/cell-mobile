(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var Cellcard = React.createClass({displayName: 'Cellcard',
	"render": function() {
		return (
			React.DOM.div({className: "cell-card", 'data-active': this.props.curdect === this.props.role, 'data-role': this.props.role, 'data-curdect': this.props.curdect}
			)
		)
	}
});
module.exports = Cellcard
},{}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Cellcard = require('./card');
var Cellheader = require('./../header/header');
var Maincard = React.createClass({displayName: 'Maincard',
	"render": function () {
		return(
			React.DOM.div({className: "cell-card main-page", 'data-active': this.props.curdect === this.props.role, 'data-role': this.props.role, 'data-curdect': this.props.curdect}, 
				Cellheader({title: this.props.title}), 
				React.DOM.a({className: "back-mask", href: "#main"})
			)
		)
	}
});
module.exports = Maincard
},{"./../header/header":6,"./card":1}],3:[function(require,module,exports){
/** @jsx React.DOM */
var Cellframe = require('./frame'),
	initHash = window.location.hash ? window.location.hash.split('#').pop() : 'main',
	frame = React.renderComponent(
		Cellframe({title: "frame page", curdect: initHash}),
		document.body
	);

window.onhashchange = function() {
	var hash = window.location.hash.split('#').pop();
	frame.setProps({'curdect':hash});
}
},{"./frame":4}],4:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var Cellcard = require('./../card/card');
var Maincard = require('./../card/main-card');
var Cellframe = React.createClass({displayName: 'Cellframe',
	"render": function () {
		return (
			React.DOM.div({className: "cell-frame"}, 
				Cellcard({active: "false", curdect: this.props.curdect, role: "navside"}), 
				Maincard({curdect: this.props.curdect, title: this.props.title, role: "main"}), 
				Cellcard({active: "false", curdect: this.props.curdect, role: "setside"})
			)
		)
	}
});

module.exports = Cellframe;
},{"./../card/card":1,"./../card/main-card":2}],5:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Backbutton = React.createClass({displayName: 'Backbutton',
	"render": function() {
		return (
			React.DOM.a({className: "header-btn back", href: this.props.href})
		)
	}
});

module.exports = Backbutton;
},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Backbutton = require('./backbutton');
var Navbutton = require('./navbutton');
var Cellheader = React.createClass({displayName: 'Cellheader',
	"render": function() {
		var button;
		if (this.props.refer) {
			button = Backbutton({href: this.props.href});
		} else {
			button = Navbutton({href: this.props.href})
		};
		return (
			React.DOM.header({className: "cell-header"}, 
				button, 
				React.DOM.h3({className: "title"}, this.props.title)
			)
		)
	}
});
module.exports = Cellheader
},{"./backbutton":5,"./navbutton":7}],7:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Navbutton = React.createClass({displayName: 'Navbutton',
	"render": function (){
		return(
			React.DOM.a({href: "#navside", className: "header-btn navbutton"})
		)
	}
});
module.exports = Navbutton;
},{}]},{},[3])