window.NeurologyTable = React.createClass({
	displayName: "NeurologyTable",

	getInitialState: function() {
		var dates = _.uniq(_.map(window.samplePatientRecordNeuroState, 'date'));
		dates = _.sortBy(dates, function (d) {
			return new Date(d);
		});

		return {
			dates: dates,
			conditions: window.samplePatientRecordNeuroState
		};
	},

	handleConditionChange: function(conditionId, date, qualifier, isChecked) {
		var newState = this.state;
		var conditionForDate = _.find(newState.conditions, { id: conditionId, date: date });

		if (isChecked) {
			if (conditionForDate) {
				conditionForDate.qualifiers.push(qualifier);
			} else {
				newState.conditions.push({
					id: conditionId,
					date: date,
					qualifiers: [qualifier]
				});
			}
		} else {
			_.pull(conditionForDate.qualifiers, [qualifier]);
			if (!conditionForDate.qualifiers.length) {
				_.pull(newState.conditions, conditionForDate);
			}
		}

		this.setState(newState);
	},

	render: function() {
		var colHeaderCells = this.state.dates.map(function (date) {
			return React.createElement(NeurologyTable.ColHeaderCell, { key: date, date: date });
		});
		var _this = this;var sections = _.map(this.props.config.sections, function (val, idx, col) {
			return React.createElement(NeurologyTable.Section, {
				key: val.id,
				config: val,
				qualifiers: _this.props.config.qualifiers,
				conditions: _this.state.conditions,
				dates: _this.state.dates,
				onConditionChange: _this.handleConditionChange
			});
		});

		return React.createElement(
			"table",
			{ id: "main" },
			React.createElement(
				"thead",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement("th", null),
					colHeaderCells
				)
			),
			sections
		);
	}
});