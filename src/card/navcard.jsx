/** @jsx React.DOM */
'use strict';
var Cellsearch = require('./../search/search');
var Navcard = React.createClass({
	"render": function() {
		return(
			<div className="cell-card navcard" data-active={this.props.curdect === this.props.role} data-role={this.props.role} data-curdect={this.props.curdect}>
				<Cellsearch />
			</div>
		)
	}
});

module.exports = Navcard;