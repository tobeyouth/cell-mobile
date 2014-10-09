/** @jsx React.DOM */
'use strict';
var Cellcard = React.createClass({
	"render": function() {
		return (
			<div className="cell-card" data-active={this.props.curdect === this.props.role} data-role={this.props.role} data-curdect={this.props.curdect}>
			</div>
		)
	}
});
module.exports = Cellcard