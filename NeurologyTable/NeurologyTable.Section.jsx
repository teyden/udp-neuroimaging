window.NeurologyTable.Section = React.createClass({
	render: function() {
		var _this = this; 

		var conditions = _.map(this.props.config.terms, function(condition, idx, conditions) {
			var qualifiers = condition.qualifiers || [null];
			var rows = _.map(qualifiers, function(qualifier, idx, qualifiers) {
				return <NeurologyTable.Section.Row
					key={(condition.id || condition.name)+qualifier} 
					config={{
						name: condition.name,
						id: condition.id,
						qualifier: qualifier,
					}} 
					conditions={_this.props.conditions}
					dates={_this.props.dates}
					qualifiers={_this.props.qualifiers}
					onConditionChange={_this.props.onConditionChange}
					showRowHeader={idx == 0}
				/>;
			});

			return rows;
		});

		return (
			<tbody className="group">
				<NeurologyTable.Section.HeaderRow
					key={this.props.config.id || this.props.config.name} 
					config={{
						name: this.props.config.name,
						id: this.props.config.id,
					}} 
					conditions={this.props.conditions}
					dates={this.props.dates}
					onConditionChange={this.props.onConditionChange}
				/>
				{conditions}
			</tbody>
		);
	}
});