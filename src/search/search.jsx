/** @jsx React.DOM */
'use strict';

var Cellsearch = React.createClass({
	"render": function() {
		return (
			<form onSubmit={this.props.subHandle} action={this.props.action} method={this.props.method || 'post'}>
				<input className="cell-search" onFocus={this.props.fucosHandle} type="search" placeholder={this.props.placeholder} rel="search" />
			</form>
		)
	},
	"subHandle": function(e) {
		var form = e.target,
			val = this.props.rel.search;
		if (!val) {
			return false;
		} else {
			form.submit();
		}
	}
});

module.exports = Cellsearch;