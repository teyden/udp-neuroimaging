window.NeurologyTable.ColHeaderCell = React.createClass({
	displayName: "ColHeaderCell",

	handleChange: function() {
		var newDate = this.datePicker.getDate();
		var newDateStr = newDate.getFullYear() + '-' + (newDate.getMonth()+1) + '-' + newDate.getDate();

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
		var dateParts = this.props.date.split('-');

		this.datePicker = new Pikaday({
			field: ReactDOM.findDOMNode(this.refs.date),
			format: 'YYYY-MM-DD',
			yearRange: [1950, new Date().getFullYear()],
			onSelect: this.handleChange,
			defaultDate: new Date(dateParts[0], dateParts[1]-1, dateParts[2]),
			setDefaultDate: true,
		});
	},
});