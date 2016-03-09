window.NeurologyTable.ColHeaderCell = React.createClass({
	displayName: "ColHeaderCell",

	handleChange: function() {
		var newDate = this.datePicker.getDate();
		var newDateStr = NeurologyTable.dateToString(newDate);

		this.props.onDateChange(this.props.date, newDateStr);
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

		return React.createElement(
			"th",
			null,
			dateInput
		);
	},

	componentDidMount: function() {
		this.datePicker = new Pikaday({
			field: ReactDOM.findDOMNode(this.refs.date),
			format: 'YYYY-MM-DD',
			yearRange: [1950, new Date().getFullYear()],
			onSelect: this.handleChange,
			defaultDate: NeurologyTable.stringToDate(this.props.date),
			setDefaultDate: true,
		});
	},
});