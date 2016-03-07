window.NeurologyTable.Section = React.createClass({
	displayName: "Section",

	render: function () {
		var _this = this;

		var conditions = _.map(this.props.section.terms, function (condition, condIdx, conditions) {
			var qualifiers = condition.qualifiers || [null];
			var rows = _.map(qualifiers, function (qualifier, qualIdx, qualifiers) {
				return React.createElement(NeurologyTable.Section.Row, {
					key: (condition.id || condition.name) + qualifier,
					name: condition.name,
					id: condition.id,
					qualifier: qualifier,
					qualifierValues: _this.props.qualifiersToValues[qualifier],
					conditions: _.filter(_this.props.conditions, { id: condition.id }),
					dates: _this.props.dates,
					onConditionChange: _this.props.onConditionChange,
					showRowHeader: qualIdx == 0
				});
			});

			return rows;
		});

		return React.createElement(
			"tbody",
			{ className: "group" },
			React.createElement(NeurologyTable.Section.HeaderRow, {
				key: this.props.id || this.props.name,
				name: this.props.name,
				id: this.props.id,
				conditions: this.props.conditions,
				dates: this.props.dates,
				onConditionChange: this.props.onConditionChange
			}),
			conditions
		);
	}
});