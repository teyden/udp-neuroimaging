window.NeurologyTable.Section.Row = React.createClass({
	render: function() {

		// var existingCondition = _.find(this.props.conditions, {id: this.props.config.id, date: })
		var _this = this; var cells = _.map(this.props.dates, function(val, idx, col) {
			return <NeurologyTable.Section.Row.Cell
				key={_this.props.config.id + val} 
				config={_this.props.config} 
				date={val}
				conditions={_this.props.conditions} 
				onConditionChange={_this.props.onConditionChange}
			/>;
		});

		return (
			<tr className="term-child">
				<th>{this.props.showRowHeader ? this.props.config.name : ''}</th>
				{cells}
			</tr>
		);
	}
});