window.samplePatientRecordNeuroState = [{
	id: "hp:0002079",
	date: "2015-01-20",
	qualifiers: {
		spatial_pattern: "HP:0012837",
	}
}, {
	id: "hp:0001338",
	date: "2015-01-20",
	qualifiers: {
		spatial_pattern: "HP:0012837",
	}
}, {
	id: "hp:0008278",
	date: "2015-10-01",
	notes: "Strong presence."
}, {
	id: "hp:0001338",
	date: "2016-01-01",
	qualifiers: {
		spatial_pattern: "HP:0012837",
	},
	notes: "Observed on MRI scan."
}, {
	id: "enlarged cerebral subarachnoid space",
	date: "2015-10-01",
	qualifiers: {
		spatial_pattern: "HP:0012837",
		severity: "HP:0012828",
	},
}];

fetch('config.json', {
	method: 'get'
}).then(function (response) {
	return response.json();
}).then(function (json) {
	var rows = json;

	ReactDOM.render(React.createElement(NeurologyTable, { config: rows }), document.getElementById('table-container'));
});