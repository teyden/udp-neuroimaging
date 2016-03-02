var NeurologyTable = React.createClass({
	render: function() {
		var rows = this.props.rows.map(function(row) {
			return (
				<NeurologyTable.Section data={row} />
			);
		});

		return (
			<table>
				<thead>
					<tr>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
});

NeurologyTable.Section = React.createClass({
	render: function() {
		return (
			<tbody>
				<tr>
					<td>{this.props.data.name}</td>
				</tr>
			</tbody>
		);
	}
});

NeurologyTable.Section.Header = React.createClass({});
NeurologyTable.Section.Row = React.createClass({});
NeurologyTable.Section.Row.Cell = React.createClass({
	render: function() {
		return (
			<td>
				I'm a cell!
			</td>
		);
	},
});

fetch('config.json', {
	method: 'get'
})
.then(function(response) {
	return response.json();
})
.then(function(json) {
	var rows = json.sections;

	ReactDOM.render(
	  <NeurologyTable rows={rows} />,
	  document.getElementById('table-container')
	);
});

