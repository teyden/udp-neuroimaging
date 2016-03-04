window.NeurologyTable.Section.Row.Cell = React.createClass({
	handleCheckboxChange: function() {
		this.props.onConditionChange("hello");
	},

	render: function() {
		if (this.props.config.qualifier != null) {
			var _this = this;
			var existingConditions = _.filter(this.props.conditions, {id: this.props.config.id, date: this.props.date});
			var checkboxes = _.map(this.props.qualifiers[this.props.config.qualifier], function(qualVal, idx, qualVals) {
				var thisCondition = _.find(existingConditions, function(v, k, l) {
					return _.indexOf(v.qualifiers, qualVal.id) > -1;
				});

				return (
					<label key={qualVal.name}>
						<input 
							type="checkbox" 
							onChange={_this.handleCheckboxChange}
							checked={thisCondition}
						/>
						{qualVal.name}
					</label>
				);
			});
		}

		return (
			<td>{checkboxes}</td>
		);
	}
});