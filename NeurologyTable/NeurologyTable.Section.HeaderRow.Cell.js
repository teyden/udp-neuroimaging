window.NeurologyTable.Section.HeaderRow.Cell = React.createClass({
	displayName: "Cell",

	handleCheckboxChange: function (e) {
		this.props.onConditionChange(this.props.section.id, this.props.date, null, [], e.target.checked, true);
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

		var isChecked = matchingConditions.length == 0;
		isChecked &= thisCondition && thisCondition.isNormal;

		var classNames = [];
		if (isChecked) {
			classNames.push("has-selected");
		} else if (matchingConditions.length) {
			classNames.push("disabled");
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
						checked: isChecked,
						disabled: matchingConditions.length > 0,
						value: "isNormal"
					}
				),
				"Normal",
				notes
			)
		);
	}
});