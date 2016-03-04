window.samplePatientRecordNeuroState = [{
	id: "hp:0002079",
	date: "2015-01-20",
	qualifiers: ["HP:0012837"]
}, {
	id: "hp:0001338",
	date: "2015-01-20",
	qualifiers: ["HP:0012837"]
}, {
	id: "hp:0008278",
	date: "2015-10-01"
}, {
	id: "hp:0001338",
	date: "2016-01-01",
	qualifiers: ["HP:0012837"]
}];

fetch('config.json', {
	method: 'get'
}).then(function (response) {
	return response.json();
}).then(function (json) {
	var rows = json;

	ReactDOM.render(React.createElement(NeurologyTable, { config: rows }), document.getElementById('table-container'));
});