define([
  "react",
  "react-dom",
  "NeurologyTable"
], function(
  React,
  ReactDOM,
  NeurologyTable
) {
  var samplePatientRecordNeuroState = [
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

  var config = {
    "sections": [
      {
        "name": "corpus callosum",
        "id": "hp:0001273",
        "terms": [
          {
            "name": "hyperplasia",
            "id": "hp:0007074",
            "qualifiers": ["spatial_pattern"]
          },
          {
            "name": "hypoplasia",
            "id": "hp:0002079",
            "qualifiers": ["spatial_pattern"]
          },
          {
            "name": "partial agenesis",
            "id": "hp:0001338"
          },
          {
            "name": "agenesis",
            "id": "hp:0001274"
          }
        ]
      },
      {
        "name": "brainstem",
        "id": "hp:0002363",
        "terms": [
          {
            "name": "hypoplasia",
            "id": "hp:0002365",
            "qualifiers": ["spatial_pattern"]
          },
          {
            "name": "hyperplasia",
            "id": "hp:0012755",
            "qualifiers": ["spatial_pattern"]
          },
          {
            "name": "abnormal MRI signal",
            "id": "hp:0012747"
          }
        ]
      },
      {
        "name": "cerebellum",
        "id": "hp:0001317",
        "terms": [
          {
            "name": "hemisphere atrophy",
            "id": "hp:0008278"
          },
          {
            "name": "vermis atrophy",
            "id": "hp:0006855"
          },
          {
            "name": "hemisphere hypoplasia",
            "id": "hp:0100307"
          },
          {
            "name": "vermis hypolasia",
            "id": "hp:0001320"
          },
          {
            "name": "cerebellar gliosis",
            "id": "hp:0012698"
          },
          {
            "name": "swelling/edema",
            "id": "swelling/edema of the cerebellum"
          }
        ]
      },
      {
        "name": "cisterns",
        "id": "Abnormality of the cisterns",
        "terms": [
          {
            "name": "enlarged cisterns",
            "id": "hp:0100952"
          }
        ]
      },
      {
        "name": "subarachnoid/csf space",
        "id": "hp:0012703",
        "terms": [
          {
            "name": "enlarged cerebral subarachnoid space",
            "id": "enlarged cerebral subarachnoid space",
            "qualifiers": ["spatial_pattern", "severity"]
          },
          {
            "name": "enlarged cerebellar subarachnoid space",
            "id": "enlarged cerebellar subarachnoid space",
            "qualifiers": ["spatial_pattern", "severity"]
          },
          {
            "name": "arachnoid cycst",
            "id": "hp:0100702"
          }
        ]
      },
      {
        "name": "ventricles",
        "id": "hp:0002118",
        "terms": [
          {
            "name": "ventriculomegaly",
            "id": "hp:0002119",
            "qualifiers": ["spatial_pattern", "severity"]
          }
        ]
      },
      {
        "name": "cerebral cortex",
        "id": "hp:0002538",
        "terms": [
          {
            "name": "atrophy",
            "id": "hp:0002120",
            "qualifiers": ["severity"]
          },
          {
            "name": "dysgenesis/migration abnormality",
            "id": "hp:0002538"
          }
        ]
      },
      {
        "name": "white matter",
        "id": "hp:0002500",
        "terms": [
          {
            "name": "hypomyelination",
            "id": "hp:0006808"
          },
          {
            "name": "demyelination",
            "id": "hp:0007258"
          },
          {
            "name": "dysmyelination",
            "id": "hp:0007266"
          },
          {
            "name": "delayed myelination",
            "id": "hp:0002188"
          },
          {
            "name": "white matter atrophy",
            "id": "hp:0012762"
          },
          {
            "name": "white matter gliosis",
            "id": "hp:0002171"
          },
          {
            "name": "PVL",
            "id": "hp:0006970"
          },
          {
            "name": "hypermyelination",
            "id": "hp:0012754"
          },
          {
            "name": "cerebral edema",
            "id": "hp:0002181"
          }
        ]
      },
      {
        "name": "basal ganglia",
        "id": "hp:0002134",
        "terms": [
          {
            "name": "large basal ganglia",
            "id": "hp:0007048"
          },
          {
            "name": "small basal ganglia",
            "id": "hp:0012697"
          },
          {
            "name": "abnormal MRI signal (basal ganglia)",
            "id": "hp:0012751"
          },
          {
            "name": "dysgenesis",
            "id": "basal ganglia - dysgenesis"
          },
          {
            "name": "swelling/edema",
            "id": "basal ganglia - swelling/edema"
          }
        ]
      },
      {
        "name": "thalami",
        "id": "hp:0010663",
        "terms": [
          {
            "name": "abnormal thalamic size",
            "id": "hp:0012693"
          },
          {
            "name": "abnormal MRI signal (thalami)",
            "id": "hp:0012696"
          },
          {
            "name": "dysgenesis",
            "id": "thalami - dysgenesis"
          },
          {
            "name": "swelling/edema",
            "id": "thalami - swelling/edema"
          }
        ]
      },
      {
        "name": "hypothalamus",
        "id": "hp:0012286",
        "terms": [
          {
            "name": "hypothalamic atrophy",
            "id": "hypothalamic atrophy"
          },
          {
            "name": "hypothalamic gliosis",
            "id": "hypothalamic gliosis"
          },
          {
            "name": "hypothalamic dysgenesis",
            "id": "hypothalamic dysgenesis"
          }
        ]
      },
      {
        "name": "olfactory apparatus",
        "id": "abnormality of the olfactory apparatus",
        "terms": []
      },
      {
        "name": "pituitary gland",
        "id": "hp:0012503",
        "terms": [
          {
            "name": "enlarged pituitary gland",
            "id": "hp:0012505"
          },
          {
            "name": "small pituitary gland",
            "id": "hp:0012506"
          },
          {
            "name": "abnormality of the pineal gland",
            "id": "hp:0012680"
          },
          {
            "name": "pituitary tumor/mass",
            "id": "hp:0011750"
          },
          {
            "name": "calcifications",
            "id": "hp:0010513"
          }
        ]
      },
      {
        "name": "spine",
        "id": "hp:0000925",
        "terms": [
          {
            "name": "abnormality of the cervical spine",
            "id": "hp:0003319"
          },
          {
            "name": "abnormality of the thoracic spine",
            "id": "hp:0100711"
          },
          {
            "name": "abnormality of the lumbar spine",
            "id": "hp:0100712"
          },
          {
            "name": "abnormality of the sacrum",
            "id": "hp:0005107"
          }
        ]
      },
      {
        "name": "MR spectroscopy",
        "id": "Abnormality of MR Spectroscopy",
        "terms": [
          {
            "name": "abnormal MRS imaging",
            "id": "hp:0012705"
          },
          {
            "name": "decreased NAA",
            "id": "hp:0012708"
          },
          {
            "name": "elevated NAA",
            "id": "MR spectroscopy - elevated NAA"
          },
          {
            "name": "elevated choline",
            "id": "hp:0012706"
          },
          {
            "name": "decreased choline",
            "id": "MR spectroscopy - decreased choline"
          },
          {
            "name": "elevated creatine",
            "id": "MR spectroscopy - elevated creatine"
          },
          {
            "name": "decreased creatine",
            "id": "MR spectroscopy - decreased creatine"
          },
          {
            "name": "elevated lactate",
            "id": "hp:0012707"
          },
          {
            "name": "decreased lactate",
            "id": "MR spectroscopy - decreased lactate"
          }
        ]
      },
      {
        "name": "cerebral vasculature",
        "id": "hp:0100659",
        "terms": []
      },
      {
        "name": "cerebral hemorrhage",
        "id": "hp:0001342",
        "terms": []
      },
      {
        "name": "brain calcification",
        "id": "hp:0002514",
        "terms": []
      },
      {
        "name": "iron deposition in brain",
        "id": "hp:0012675",
        "terms": []
      },
      {
        "name": "copper deposition in brain",
        "id": "hp:0012676",
        "terms": []
      }
    ],
    "qualifiers": {
      "severity": [
        {
          "id": "HP:0012825",
          "name": "Mild"
        },
        {
          "id": "HP:0012826",
          "name": "Moderate"
        },
        {
          "id": "HP:0012828",
          "name": "Severe"
        }
      ],
      "spatial_pattern": [
        {
          "id": "HP:0012837",
          "name": "Generalized"
        },
        {
          "id": "HP:0012838",
          "name": "Localized"
        }
      ]
    }
  };

  return function() {
    ReactDOM.render(React.createElement(NeurologyTable, { config: config, initialState: samplePatientRecordNeuroState }), document.getElementById('table-container'));
  };
});


