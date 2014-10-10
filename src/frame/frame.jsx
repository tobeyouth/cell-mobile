/** @jsx React.DOM */
'use strict';
var Cellcard = require('./../card/card');
var Navcard = require('./../card/navcard');
var Maincard = require('./../card/maincard');

var Cellframe = React.createClass({
	"render": function () {
		return (
			<div className="cell-frame">
				<Navcard curdect={this.props.curdect} active="false" role="navside" />
				<Maincard curdect={this.props.curdect} title={this.props.title} role="main" />
			</div>
		)
	}
});

module.exports = Cellframe;