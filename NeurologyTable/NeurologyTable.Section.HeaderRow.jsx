window.NeurologyTable.Section.HeaderRow = React.createClass({
	render: function() {
		var _this = this; var cells = _.map(this.props.dates, function(val, idx, col) {
			return <NeurologyTable.Section.HeaderRow.Cell
				key={_this.props.config.id + val} 
				config={_this.props.config} 
				date={val}
				conditions={_this.props.conditions} 
				onConditionChange={_this.props.onConditionChange}
			/>;
		});

		return (
			<tr className="term-header">
				<th>{this.props.config.name}</th>
				{cells}
			</tr>
		);
	}
});