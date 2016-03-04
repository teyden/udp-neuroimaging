window.NeurologyTable.ColHeaderCell = React.createClass({
	displayName: "ColHeaderCell",

	render: function render() {
		return React.createElement(
			"th",
			null,
			this.props.date
		);
	}
});