define(
"NeurologyTableSectionHeaderRow",
[
    "react", 
    "lodash",
    "NeurologyTableSectionHeaderRowCell"
], function(
    React, 
    _,
    NeurologyTableSectionHeaderRowCell
) {
    var NeurologyTableSectionHeaderRow = React.createClass({
        displayName: "HeaderRow",

        render: function () {
            var _this = this;
            var cells = _.map(this.props.dates, function (val, idx, col) {
                return React.createElement(NeurologyTableSectionHeaderRowCell, {
                    key: _this.props.section.id + val,
                    section: _this.props.section,
                    date: val,
                    conditions: _this.props.conditions,
                    onConditionChange: _this.props.onConditionChange,
                    onNoteChange: _this.props.onNoteChange
                });
            });

            return React.createElement(
                "tr",
                { className: "term-header" },
                React.createElement(
                    "th",
                    null,
                    this.props.section.name
                ),
                cells,
                React.createElement(
                    "td",
                    {className: "empty"},
                    null
                )
            );
        }
    });

    return NeurologyTableSectionHeaderRow;
});
