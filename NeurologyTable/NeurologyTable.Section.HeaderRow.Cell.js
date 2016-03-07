window.NeurologyTable.Section.HeaderRow.Cell = React.createClass({
	displayName: "Cell",

	handleCheckboxChange: function (e) {
		// todo
		// should a negative phenotype be recorded?
	},

	render: function () {
		var thisSectionConditions = _.map(this.props.section.terms, 'id');
		var _this = this;
		var matchingConditions = _.filter(this.props.conditions, function(condition) {
			var match = condition.date == _this.props.date;
			match &= _.indexOf(thisSectionConditions, condition.id) > -1;
			return match;
		});

		return React.createElement(
			"td",
			matchingConditions.length > 0 ? { className: "disabled" } : null,
			React.createElement(
				"label",
				null,
				React.createElement(
					"input",
					{
						type: "checkbox",
						onChange: this.handleCheckboxChange,
						checked: matchingConditions.length > 0 ? false : undefined,
						disabled: matchingConditions.length > 0,
						value: "isNormal"
					}
				),
				"Normal"
			)
		);
	}
});