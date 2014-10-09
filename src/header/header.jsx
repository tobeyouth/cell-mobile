/** @jsx React.DOM */
'use strict';

var Backbutton = require('./backbutton');
var Navbutton = require('./navbutton');
var Cellheader = React.createClass({
	"render": function() {
		var button;
		if (this.props.refer) {
			button = <Backbutton href={this.props.href} />;
		} else {
			button = <Navbutton href={this.props.href} />
		};
		return (
			<header className="cell-header">
				{button}
				<h3 className="title">{this.props.title}</h3>
			</header>
		)
	}
});
module.exports = Cellheader