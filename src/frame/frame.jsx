/** @jsx React.DOM */
'use strict';
var Cellcard = require('./../card/card');
var Maincard = require('./../card/main-card');
var Cellframe = React.createClass({
	"render": function () {
		return (
			<div className="cell-frame">
				<Cellcard active="false" curdect={this.props.curdect} role="navside" />
				<Maincard curdect={this.props.curdect} title={this.props.title} role="main" />
				<Cellcard active="false" curdect={this.props.curdect} role="setside" />
			</div>
		)
	}
});

module.exports = Cellframe;