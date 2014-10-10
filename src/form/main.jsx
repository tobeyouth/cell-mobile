/** @jsx React.DOM */

var Cellform = require('./form');
var Cellinput = require('./input');
var formExample = (
	<Cellform action="http://www.baidu.com" method="post">
		<Cellinput type="text" 
					label="Working"
					addonBefore="手机号码:" 
					hasFeedback />
	</Cellform>
);

React.renderComponent(formExample,document.getElementById('form-wrapper'));