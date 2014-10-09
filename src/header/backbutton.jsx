/** @jsx React.DOM */
'use strict';

var Backbutton = React.createClass({
	"render": function() {
		return (
			<a className="header-btn back" href={this.props.href}></a>
		)
	}
});

module.exports = Backbutton;