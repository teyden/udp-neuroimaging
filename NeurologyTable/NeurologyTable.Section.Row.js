window.NeurologyTable.Section.Row = React.createClass({
	displayName: "Row",

	render: function () {

		var _this = this;
		var cells = _.map(this.props.dates, function (val, idx, col) {
			return React.createElement(NeurologyTable.Section.Row.Cell, {
				key: _this.props.id + val,
				date: val,
				name: _this.props.name,
				id: _this.props.id,
				qualifiers: _this.props.qualifiers,
				qualifiersToValues: _this.props.qualifiersToValues,
				conditions: _.filter(_this.props.conditions, { id: _this.props.id }),
				onConditionChange: _this.props.onConditionChange,
				onNoteChange: _this.props.onNoteChange,
			});
		});

		return React.createElement(
			"tr",
			{ className: "term-child" },
			React.createElement(
				"th",
				null,
				this.props.name
			),
			cells
		);
	}
});