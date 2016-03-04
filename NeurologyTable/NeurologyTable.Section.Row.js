window.NeurologyTable.Section.Row = React.createClass({
	displayName: "Row",

	render: function render() {

		// var existingCondition = _.find(this.props.conditions, {id: this.props.config.id, date: })
		var _this = this;var cells = _.map(this.props.dates, function (val, idx, col) {
			return React.createElement(NeurologyTable.Section.Row.Cell, {
				key: _this.props.config.id + val,
				config: _this.props.config,
				date: val,
				conditions: _this.props.conditions,
				qualifiers: _this.props.qualifiers,
				onConditionChange: _this.props.onConditionChange
			});
		});

		return React.createElement(
			"tr",
			{ className: "term-child" },
			React.createElement(
				"th",
				null,
				this.props.showRowHeader ? this.props.config.name : ''
			),
			cells
		);
	}
});