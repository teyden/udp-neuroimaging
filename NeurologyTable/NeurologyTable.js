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

	handleConditionChange: function(conditionId, date, qualifier, qualifierVal, isChecked) {
		var newState = _.cloneDeep(this.state);
		var existingRecord = _.find(newState.conditions, { id: conditionId, date: date });
		var toAdd = {
			id: conditionId,
			date: date,
		};
		if (qualifier) {
			toAdd.qualifiers = {};
			toAdd.qualifiers[qualifier] = qualifierVal;
		}

		if (isChecked) {
			this.handleCheckboxChecked(newState, existingRecord, toAdd);
		} else {
			this.handleCheckboxUnchecked(newState, existingRecord, qualifier);
		}

		// if (isChecked) {
		// 	if (conditionForDate) {
		// 		conditionForDate.qualifiers.push(qualifier);
		// 	} else {
		// 		newState.conditions.push({
		// 			id: conditionId,
		// 			date: date,
		// 			qualifiers: {

		// 			}
		// 		});
		// 	}
		// } else {
		// 	_.pull(conditionForDate.qualifiers, qualifier);
		// 	if (!conditionForDate.qualifiers.length) {
		// 		_.pull(newState.conditions, conditionForDate);
		// 	}
		// }

		this.setState(newState);
	},

	handleCheckboxChecked: function(newState, existingRecord, toAdd) {
		if (_.size(toAdd.qualifiers)) {
			if (existingRecord) {
				_.merge(existingRecord, toAdd);
			} else {
				newState.conditions.push(toAdd);
			}
		} else {
			if (existingRecord) {
				// shouldn't happen
			} else {
				newState.conditions.push(toAdd);
			}
		}
	},

	handleCheckboxUnchecked: function(newState, existingRecord, qualifier) {
		if (qualifier) {
			if (existingRecord) {
				delete existingRecord.qualifiers[qualifier]

				if (!_.size(existingRecord.qualifiers)) {
					_.pull(newState.conditions, existingRecord);
				}
			} else {
				// shouldn't happen
			}
		} else {
			if (existingRecord) {
				_.pull(newState.conditions, existingRecord);
			} else {
				// shouldn't happen
			}
		}
	},

	render: function() {
		var colHeaderCells = this.state.dates.map(function (date) {
			return React.createElement(NeurologyTable.ColHeaderCell, { key: date, date: date });
		});
		var _this = this;
		var sections = _.map(this.props.config.sections, function (val, idx, col) {
			return React.createElement(NeurologyTable.Section, {
				key: val.id,
				section: val,
				qualifiersToValues: _this.props.config.qualifiers,
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