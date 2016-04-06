define(
"NeurologyTableColHeaderCell",
[
    "react", 
    "react-dom", 
    "Pikaday", 
    "NeurologyTableUtils"
], function(
    React, 
    ReactDOM, 
    Pikaday, 
    NeurologyTableUtils
) {
    return React.createClass({
        displayName: "ColHeaderCell",

        handleChange: function() {
            var newDate = this.datePicker.getDate();
            var newDateStr = NeurologyTableUtils.dateToString(newDate);

            this.props.onDateChange(this.props.date, newDateStr);
        },

        handleClickRemove: function() {
            this.props.onRemove(this.props.date);
        },

        render: function () {
            var dateInput = React.createElement(
                "input",
                {
                    type: "text",
                    defaultValue: this.props.date,
                    ref: "date"
                },
                null
            );

            var removeButton = React.createElement(
                "button",
                {
                    className: 'remove',
                    onClick: this.handleClickRemove
                },
                React.createElement("i", { "className": "fa fa-times" })
            );

            return React.createElement(
                "th",
                null,
                dateInput,
                removeButton
            );
        },

        componentDidMount: function() {
            this.datePicker = new Pikaday({
                field: ReactDOM.findDOMNode(this.refs.date),
                format: 'YYYY-MM-DD',
                yearRange: [1950, new Date().getFullYear()],
                onSelect: this.handleChange,
                defaultDate: NeurologyTableUtils.stringToDate(this.props.date),
                setDefaultDate: true,
            });
        },
    });
});
