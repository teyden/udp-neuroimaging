window.NeurologyTable.ColHeaderCell = React.createClass({
	displayName: "ColHeaderCell",

	render: function () {
		return React.createElement(
			"th",
			null,
			this.props.date
		);
	}
});