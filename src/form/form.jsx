/** @jsx React.DOM */
'use strict';

var Cellform = React.createClass({
    "render": function () {
        return (
            <form onSubmit={this.subHandle} action={this.props.action} method={this.props.method}>
            	{this.props.children}
            </form>
        );
    },
    "subHandle": function() {
    	
    }
});

module.exports = Cellform;
