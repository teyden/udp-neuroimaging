window.NeurologyTable.Section.HeaderRow.Cell = React.createClass({
	render: function() {
		return (
			<td>{JSON.stringify(this.props.config)}</td>
		);
	}
});