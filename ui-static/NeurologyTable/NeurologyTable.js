define(
"NeurologyTable",
[
    "react", 
    "react-dom", 
    "Pikaday", 
    "lodash",
    "NeurologyTableSection",
    "NeurologyTableColHeaderCell",
    "NeurologyTableUtils"
], function(
    React, 
    ReactDOM, 
    Pikaday, 
    _,
    NeurologyTableSection,
    NeurologyTableColHeaderCell,
    NeurologyTableUtils
) {
    var NeurologyTable = React.createClass({
        displayName: "NeurologyTable",

        getInitialState: function() {
            var dates = _.uniq(_.map(this.props.initialState, 'date'));
            dates = _.sortBy(dates, function (d) {
                return new Date(d);
            });

            return {
                dates: dates,
                conditions: this.props.initialState
            };
        },

        handleConditionChange: function(conditionId, date, qualifier, value, isChecked) {
            var newState = _.cloneDeep(this.state);
            var existingRecord = _.find(newState.conditions, { id: conditionId, date: date });

            if (qualifier) {
                this.handleQualifierCheckboxChange(newState, existingRecord, qualifier, value, isChecked);
            } else {
                this.handlePresenceCheckboxChange(newState, existingRecord, conditionId, date, value, isChecked);
            }

            this.setState(newState);
            console.log(newState);
        },

        handlePresenceCheckboxChange: function(newState, existingRecord, conditionId, date, value, isChecked) {
            if (isChecked) {
                var observed = value == "observed";
                if (existingRecord) {
                    existingRecord.observed = observed;
                    if (!observed) {
                        existingRecord.qualifiers = {};
                    }
                } else {
                    newState.conditions.push({
                        id: conditionId,
                        date: date,
                        observed: observed,
                    });
                }

                if (observed) {
                    // Set the section to be abnormal too
                    var sectionId = this.getSectionIdByConditionId(conditionId);
                    if (sectionId) {
                        var sectionRecord = _.find(newState.conditions, { id: sectionId, date: date });
                        if (sectionRecord) {
                            sectionRecord.observed = true;
                        } else {
                            newState.conditions.push({
                                id: sectionId,
                                date: date,
                                observed: true,
                            });
                        }
                    }
                }
            } else {
                _.pull(newState.conditions, existingRecord);
            }
        },

        handleQualifierCheckboxChange: function(newState, existingRecord, qualifier, value, isChecked) {
            if (isChecked) {
                existingRecord.qualifiers = existingRecord.qualifiers || {};
                existingRecord.qualifiers[qualifier] = value;
            } else {
                delete existingRecord.qualifiers[qualifier];
            }
        },

        handleNoteChange: function(conditionId, newNote, date) {
            var newState = _.cloneDeep(this.state);
            var existingRecord = _.find(newState.conditions, { id: conditionId, date: date });

            existingRecord.note = newNote;

            this.setState(newState);
            console.log(newState);
        },

        handleColDateChange: function(oldDate, newDate) {
            var newState = _.cloneDeep(this.state);

            _.forEach(newState.conditions, function(v, k) {
                if (v.date == oldDate) {
                    v.date = newDate;
                }
            });

            var existingDateIdx = _.indexOf(newState.dates, oldDate);
            if (existingDateIdx > -1) {
                newState.dates[existingDateIdx] = newDate;
            }

            this.setState(newState);
            console.log(newState);
        },

        handleAddColClick: function() {
            var newState = _.cloneDeep(this.state);

            var newDate = new Date();
            newDate.setHours(0, 0, 0, 0);
            var checkDupes = function(d) {
                return (NeurologyTableUtils.stringToDate(d).getTime() == newDate.getTime());
            }
            while (_.find(newState.dates, checkDupes)) {
                newDate.setTime(newDate.getTime() + 86400000);
            }
            newState.dates.push(NeurologyTableUtils.dateToString(newDate));

            this.setState(newState);
            console.log(newState);
        },

        handleRemoveColClick: function(date) {
            var newState = _.cloneDeep(this.state);

            _.pull(newState.dates, date);
            _.remove(newState.conditions, _.matchesProperty('date', date));

            this.setState(newState);
            console.log(newState);
        },

        getSectionIdByConditionId: function(conditionId) {
            var section = _.find(this.props.config.sections, function(section, idx, sections) {
                if (section.id == conditionId) { // this condition is actually a section
                    return false;
                } else if(_.find(section.terms, {'id': conditionId})) {
                    return true;
                }
            });

            return section ? section.id : undefined;
        },

        render: function() {
            var _this = this;
            var colHeaderCells = this.state.dates.map(function (date) {
                return React.createElement(
                    NeurologyTableColHeaderCell,
                    {
                        key: date,
                        date: date,
                        onDateChange: _this.handleColDateChange,
                        onRemove: _this.handleRemoveColClick
                    });
            });
            var sections = _.map(this.props.config.sections, function (val, idx, col) {
                return React.createElement(NeurologyTableSection, {
                    key: val.id,
                    section: val,
                    qualifiersToValues: _this.props.config.qualifiers,
                    conditions: _this.state.conditions,
                    dates: _this.state.dates,
                    onConditionChange: _this.handleConditionChange,
                    onNoteChange: _this.handleNoteChange
                });
            });

            return React.createElement(
                "table",
                { id: "neurology-table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement("th", null),
                        colHeaderCells,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "button",
                                {
                                    onClick: this.handleAddColClick
                                },
                                React.createElement("i", { "className": "fa fa-plus" })
                            )
                        )
                    )
                ),
                sections
            );
        }
    });
    
    return NeurologyTable;
});