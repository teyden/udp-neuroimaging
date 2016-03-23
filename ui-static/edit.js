window.samplePatientRecordNeuroState = [
{
  "id": "hp:0100659",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0100659",
  "date": "2015-3-1",
  "observed": true,
  "note": "enlarged vessels"
},
{
  "id": "hp:0100659",
  "date": "2016-3-1",
  "observed": true,
  "note": "enlarged vessels"
},
{
  "id": "hp:0001342",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0001342",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0001342",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0002514",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0002514",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0002514",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0012675",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0012675",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0012675",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0012676",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0012676",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0012676",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0001273",
  "date": "2014-3-1",
  "observed": false,
  "qualifiers": {
    
  }
},
{
  "id": "hp:0007074",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0002079",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0001338",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0001274",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0001273",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0007074",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0002079",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0001338",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0001274",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0007074",
  "date": "2016-3-1",
  "observed": true,
  "qualifiers": {
    "spatial_pattern": "HP:0012838"
  },
  "note": "in lower section"
},
{
  "id": "hp:0001273",
  "date": "2016-3-1",
  "observed": true
},
{
  "id": "hp:0002079",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0001338",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0001274",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0002363",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0002363",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0002363",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0001317",
  "date": "2014-3-1",
  "observed": false
},
{
  "id": "hp:0001317",
  "date": "2015-3-1",
  "observed": false
},
{
  "id": "hp:0001317",
  "date": "2016-3-1",
  "observed": false
},
{
  "id": "hp:0100952",
  "date": "2014-3-1",
  "observed": true
},
{
  "id": "Abnormality of the cisterns",
  "date": "2014-3-1",
  "observed": true
},
{
  "id": "hp:0100952",
  "date": "2015-3-1",
  "observed": true
},
{
  "id": "Abnormality of the cisterns",
  "date": "2015-3-1",
  "observed": true
},
{
  "id": "hp:0100952",
  "date": "2016-3-1",
  "observed": true
},
{
  "id": "Abnormality of the cisterns",
  "date": "2016-3-1",
  "observed": true
}
];

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