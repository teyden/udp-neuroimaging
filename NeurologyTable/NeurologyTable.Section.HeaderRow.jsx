window.NeurologyTable.Section.HeaderRow = React.createClass({
	displayName: "HeaderRow",

	render: function render() {
		var _this = this;var cells = _.map(this.props.dates, function (val, idx, col) {
			return React.createElement(NeurologyTable.Section.HeaderRow.Cell, {
				key: _this.props.config.id + val,
				config: _this.props.config,
				date: val,
				conditions: _this.props.conditions,
				onConditionChange: _this.props.onConditionChange
			});
		});

		return React.createElement(
			"tr",
			{ className: "term-header" },
			React.createElement(
				"th",
				null,
				this.props.config.name
			),
			cells
		);
	}
});