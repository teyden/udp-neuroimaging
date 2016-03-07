window.NeurologyTable.Section.Row.Cell = React.createClass({
	displayName: "Cell",

	handleCheckboxChange: function (e) {
		this.props.onConditionChange(
			this.props.id, 
			this.props.date, 
			this.props.qualifier, 
			e.target.value, 
			e.target.checked
		);
	},

	render: function () {
		var existingConditions = _.filter(this.props.conditions, { date: this.props.date });
		if (this.props.qualifier) {
			var _this = this;
			var checkboxes = _.map(this.props.qualifierValues, function (qualVal, idx, qualVals) {
				var thisCondition = _.find(existingConditions, ["qualifiers."+_this.props.qualifier, qualVal.id]);

				return React.createElement(
					"label",
					{ key: qualVal.name },
					React.createElement("input", {
						type: "checkbox",
						onChange: _this.handleCheckboxChange,
						checked: !!thisCondition,
						value: qualVal.id
					}),
					qualVal.name
				);
			});
		} else {
			checkboxes = [React.createElement("input", {
				key: "affected",
				type: "checkbox",
				onChange: this.handleCheckboxChange,
				checked: !!existingConditions.length,
				value: "affected"
			})];
		}

		return React.createElement(
			"td",
			null,
			checkboxes
		);
	}
});