var Cellframe = require('./frame'),
	initHash = window.location.hash ? window.location.hash.split('#').pop() : 'main',
	frame = React.renderComponent(
		<Cellframe title="frame page" curdect={initHash} />,
		document.body
	);

window.onhashchange = function() {
	var hash = window.location.hash.split('#').pop();
	frame.setProps({'curdect':hash});
}