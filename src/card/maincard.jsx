/** @jsx React.DOM */
'use strict';

var Cellheader = require('./../header/header');
var Maincard = React.createClass({
	"render": function () {
		return(
			<div className="cell-card main-page" data-active={this.props.curdect === this.props.role} data-role={this.props.role} data-curdect={this.props.curdect}>
				<Cellheader title={this.props.title} />
				<a className="back-mask" href='#main'></a>
			</div>
		)
	}
});
module.exports = Maincard