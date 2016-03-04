window.NeurologyTable.Section.Row.Cell = React.createClass({
	displayName: "Cell",

	handleCheckboxChange: function handleCheckboxChange(e) {
		this.props.onConditionChange(this.props.config.id, this.props.date, e.target.value, e.target.checked);
	},

	render: function render() {
		if (this.props.config.qualifier != null) {
			var _this = this;
			var existingConditions = _.filter(this.props.conditions, { id: this.props.config.id, date: this.props.date });
			var checkboxes = _.map(this.props.qualifiers[this.props.config.qualifier], function (qualVal, idx, qualVals) {
				var thisCondition = _.find(existingConditions, function (v, k, l) {
					return _.indexOf(v.qualifiers, qualVal.id) > -1;
				});

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
		}

		return React.createElement(
			"td",
			null,
			checkboxes
		);
	}
});