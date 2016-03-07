window.NeurologyTable.Section.HeaderRow = React.createClass({
	displayName: "HeaderRow",

	render: function () {
		var _this = this;
		var cells = _.map(this.props.dates, function (val, idx, col) {
			return React.createElement(NeurologyTable.Section.HeaderRow.Cell, {
				key: _this.props.id + val,
				name: _this.props.name,
				id: _this.props.id,
				date: val,
				isNormal: _.filter(_this.props.conditions, { id: _this.props.id }).length < 1,
				onConditionChange: _this.props.onConditionChange
			});
		});

		return React.createElement(
			"tr",
			{ className: "term-header" },
			React.createElement(
				"th",
				null,
				this.props.name
			),
			cells
		);
	}
});