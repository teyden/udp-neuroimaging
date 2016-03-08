window.NeurologyTable.Section = React.createClass({
	displayName: "Section",

	render: function () {
		var _this = this;

		var conditionsRows = _.map(this.props.section.terms, function (condition, condIdx) {
			return React.createElement(NeurologyTable.Section.Row, {
				key: condition.id || condition.name,
				name: condition.name,
				id: condition.id,
				qualifiers: condition.qualifiers,
				qualifiersToValues: _this.props.qualifiersToValues,
				conditions: _.filter(_this.props.conditions, { id: condition.id }),
				dates: _this.props.dates,
				onConditionChange: _this.props.onConditionChange,
				onNoteChange: _this.props.onNoteChange
			});

			return rows;
		});

		return React.createElement(
			"tbody",
			{ className: "group" },
			React.createElement(NeurologyTable.Section.HeaderRow, {
				key: this.props.section.id || this.props.section.name,
				section: this.props.section,
				conditions: this.props.conditions,
				dates: this.props.dates,
				onConditionChange: _this.props.onConditionChange,
				onNoteChange: _this.props.onNoteChange
			}),
			conditionsRows
		);
	}
});