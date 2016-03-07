window.NeurologyTable.Section.HeaderRow.Cell = React.createClass({
	displayName: "Cell",

	render: function () {
		return React.createElement(
			"td",
			null,
			JSON.stringify(this.props)
		);
	}
});