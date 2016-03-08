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
	note: "Strong presence."
}, {
	id: "hp:0001338",
	date: "2016-01-01",
	qualifiers: {
		spatial_pattern: "HP:0012837",
	},
	note: "Observed on MRI scan."
}, {
	id: "enlarged cerebral subarachnoid space",
	date: "2015-10-01",
	qualifiers: {
		spatial_pattern: "HP:0012837",
		severity: "HP:0012828",
	},
}];

var xmlhttp = new XMLHttpRequest();
var url = "config.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var rows = JSON.parse(xmlhttp.responseText);

        ReactDOM.render(React.createElement(NeurologyTable, { config: rows }), document.getElementById('table-container'));

    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();