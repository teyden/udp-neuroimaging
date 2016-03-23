window.NeurologyTable.Section.HeaderRow.Cell = React.createClass({
	displayName: "Cell",

	handleCheckboxChange: function (e) {
		this.props.onConditionChange(this.props.section.id, this.props.date, null, e.target.value, e.target.checked);
	},

	handleNoteChange: function(newNote) {
		this.props.onNoteChange(this.props.section.id, newNote, this.props.date);
	},

	render: function () {
		var thisSectionConditions = _.map(this.props.section.terms, 'id');
		var _this = this;
		var matchingConditions = _.filter(this.props.conditions, function(condition) {
			var match = condition.date == _this.props.date;
			match &= _.indexOf(thisSectionConditions, condition.id) > -1;
			return match;
		});

		var thisCondition = _.find(this.props.conditions, {id: this.props.section.id, date: this.props.date});
		var notes = React.createElement(
			NeurologyTable.Section.Row.Cell.Note,
			{
				note: thisCondition && thisCondition.note || null,
				onNoteChange: this.handleNoteChange,
			},
			null
		);

		var classNames = [];
		if (thisCondition) {
			classNames.push("is-investigated");
		}

		return React.createElement(
			"td",
			{className: classNames.join(' ')},
			React.createElement(
				"label",
				null,
				React.createElement(
					"input",
					{
						type: "checkbox",
						onChange: this.handleCheckboxChange,
						checked: thisCondition && !thisCondition.observed,
						disabled: matchingConditions.length > 0,
						value: "notObserved"
					}
				),
				"Normal"
			),
			React.createElement(
				"label",
				null,
				React.createElement(
					"input",
					{
						type: "checkbox",
						onChange: this.handleCheckboxChange,
						checked: thisCondition && thisCondition.observed,
						value: "observed"
					}
				),
				"Abnormal"
			),
			notes
		);
	}
});