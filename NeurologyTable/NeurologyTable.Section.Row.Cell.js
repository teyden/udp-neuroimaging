window.NeurologyTable.Section.Row.Cell = React.createClass({
	displayName: "Cell",

	handleCheckboxChange: function (qualifier, e) {
		this.props.onConditionChange(
			this.props.id, 
			this.props.date, 
			qualifier, 
			e.target.value, 
			e.target.checked
		);
	},

	handleNoteChange: function(newNote) {
		this.props.onNoteChange(this.props.id, newNote, this.props.date);
	},

	render: function () {
		var thisCondition = _.find(this.props.conditions, { date: this.props.date });
		if (this.props.qualifiers && this.props.qualifiers.length) {
			var _this = this;

			var checkboxes = _.map(this.props.qualifiers, function(qual, qualIdx) {
				var qualVals = _.map(_this.props.qualifiersToValues[qual], function(qualVal, qualValIdx) {
					var isChecked = !!thisCondition 
						&& !!thisCondition.qualifiers[qual] 
						&& thisCondition.qualifiers[qual] == qualVal.id;

					return React.createElement(
						"label",
						{ key: qualVal.name },
						React.createElement("input", {
							type: "checkbox",
							onChange: _.partial(_this.handleCheckboxChange, qual),
							checked: isChecked,
							value: qualVal.id
						}),
						qualVal.name
					); 
				});

				return new React.createElement("div", 
					{ 
						key: qual,
						className: 'qualifier-group'
					}, 
					qualVals
				);
			});
		} else {
			checkboxes = [React.createElement("input", {
				key: "affected",
				type: "checkbox",
				onChange: _.partial(this.handleCheckboxChange, null),
				checked: !!thisCondition,
				value: "affected"
			})];
		}
		var note = React.createElement(
			NeurologyTable.Section.Row.Cell.Note,
			{
				note: thisCondition && thisCondition.note || null,
				onNoteChange: this.handleNoteChange,
			},
			null
		);

		return React.createElement(
			"td",
			thisCondition ? { className: "has-selected" } : null,
			checkboxes,
			note
		);
	}
});