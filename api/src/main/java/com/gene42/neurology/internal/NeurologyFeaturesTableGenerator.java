package com.gene42.neurology.internal;

import java.io.StringWriter;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class NeurologyFeaturesTableGenerator
{

    private Document document;
    private final Set<Date> dates;
    private Map<String, String> qualifierValIdToLabel = new HashMap<>();

    public NeurologyFeaturesTableGenerator(JSONArray features, JSONObject config) throws Exception
    {
        this.features = features;
        this.config = config;

        dates = new TreeSet<>();
        for (int i = 0; i < features.length(); i++) {
            String dateStr = features.getJSONObject(i).getString(NeurologyFeature.JSON_KEY_DATE);

            try {
                dates.add(NeurologyFeature.dateFormat.parse(dateStr));
            } catch (ParseException e) {

            }
        }

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            document = builder.newDocument();
        } catch (ParserConfigurationException e) {
            throw new Exception("Error generating Neurology table", e);
        }

        JSONObject qualifiers = config.getJSONObject("qualifiers");
        for (Object key : new ArrayList(Arrays.asList(NeurologyFeature.JSON_KEY_SEVERITY, NeurologyFeature.JSON_KEY_SPATIAL_PATTERN))) {
            JSONArray qualifierVals = qualifiers.getJSONArray((String) key);

            for (int i = 0; i < qualifierVals.length(); i++) {
                JSONObject qualifierVal = qualifierVals.getJSONObject(i);
                qualifierValIdToLabel.put(qualifierVal.getString("id"), qualifierVal.getString("name"));
            }
        }
    }

    public String getHtml() throws Exception
    {
        JSONArray sections = config.getJSONArray("sections");

        Element table = (Element) document.createElement("table");
        table.setAttribute("id", "neurology-table");
        document.appendChild(table);

        table.appendChild(getTableHeaderRow());

        for (int i = 0; i < sections.length(); i++) {
            JSONObject section = sections.getJSONObject(i);

            table.appendChild(getSection(section));
        }

        return getDocumentHtml();
    }

    private Element getSection(JSONObject section)
    {
        Element sectionEl = document.createElement("tbody");
        sectionEl.setAttribute("class", "group");

        sectionEl.appendChild(getConditionRow(section, true));

        JSONArray terms = section.getJSONArray("terms");
        for (int j = 0; j < terms.length(); j++) {
            JSONObject term = terms.getJSONObject(j);
            Element rowEl = getConditionRow(term, false);

            if (rowEl != null) {
                sectionEl.appendChild(rowEl);
            }
        }
        return sectionEl;
    }

    private Element getConditionRow(JSONObject term, boolean isSectionHeader)
    {
        Element rowEl = document.createElement("tr");
        if (isSectionHeader) {
            rowEl.setAttribute("class", "term-header");
        } else {
            rowEl.setAttribute("class", "term-child");
        }

        rowEl.appendChild(getRowHeaderCell(term.getString("name")));

        int observedCellCount = 0;
        for (Date date : dates) {
            JSONObject feature = getFeatureByIdAndDate(term.getString(NeurologyFeature.JSON_KEY_ID), date);
            if (feature != null) {
                observedCellCount++;
            }

            rowEl.appendChild(getConditionCell(feature, isSectionHeader));
        }

        if (observedCellCount > 0 || isSectionHeader) {
            return rowEl;
        } else {
            return null;
        }
    }

    private Element getConditionCell(JSONObject feature, boolean isSectionHeader)
    {
        Element cellEl = document.createElement("td");

        if (feature != null) {
            String text;
            if (feature.getBoolean(NeurologyFeature.JSON_KEY_IS_OBSERVED)) {
                text = isSectionHeader ? "Abnormal" : "✔";
                cellEl.setAttribute("class", "observed");
            } else {
                text = isSectionHeader ? "Normal" : "✘";
                cellEl.setAttribute("class", "not-observed");
            }
            cellEl.appendChild(document.createTextNode(text));

            Element qualifiersEl = getConditionQualifiersEl(feature);
            if (qualifiersEl != null) {
                cellEl.appendChild(qualifiersEl);
            }

            String comments = feature.optString(NeurologyFeature.JSON_KEY_COMMENTS);
            if (comments != null && !comments.isEmpty()) {
                Element commentEl = document.createElement("p");
                commentEl.setAttribute("class", "note");
                commentEl.appendChild(document.createTextNode(comments));
                cellEl.appendChild(commentEl);
            }
        } else {
            cellEl.setAttribute("class", "unknown");
        }

        return cellEl;
    }

    private Element getConditionQualifiersEl(JSONObject feature)
    {
        JSONObject qualifiers = feature.optJSONObject(NeurologyFeature.JSON_KEY_QUALIFIERS);
        if (qualifiers == null) {
            return null;
        } else {
            Element qualifiersEl = document.createElement("ul");

            for (Object key : new ArrayList(Arrays.asList(NeurologyFeature.JSON_KEY_SEVERITY, NeurologyFeature.JSON_KEY_SPATIAL_PATTERN))) {
                Element qualifierEl = getConditionQualifierEl(qualifiers, (String) key);

                if (qualifierEl != null) {
                    qualifiersEl.appendChild(qualifierEl);
                }
            }

            return qualifiersEl;
        }
    }

    private Element getConditionQualifierEl(JSONObject qualifiers, String key)
    {
        String qualifierVal = qualifiers.optString(key);
        if (qualifierVal == null || qualifierVal.isEmpty()) {
            return null;
        } else {
            Element qualifierEl = document.createElement("li");
            qualifierEl.appendChild(document.createTextNode(qualifierValIdToLabel.get(qualifierVal)));

            return qualifierEl;
        }
    }

    private Element getTableHeaderRow()
    {
        Element tableHeaderEl = document.createElement("thead");
        tableHeaderEl.appendChild(document.createElement("th"));
        for (Date date : dates) {
            Element dateCellEl = document.createElement("th");
            dateCellEl.appendChild(document.createTextNode(NeurologyFeature.dateFormat.format(date)));
            tableHeaderEl.appendChild(dateCellEl);
        }
        return tableHeaderEl;
    }

    private String getDocumentHtml() throws Exception
    {
        try {
            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");

            DOMSource domSource = new DOMSource(document);
            transformer.transform(domSource, result);

            return writer.toString();
        } catch (TransformerConfigurationException e) {
            throw new Exception("Error generating Neurology table", e);
        }
    }

    private Element getRowHeaderCell(String conditionName)
    {
        Element rowHeaderCell = document.createElement("th");
        rowHeaderCell.appendChild(document.createTextNode(conditionName));
        return rowHeaderCell;
    }

    private JSONObject getFeatureByIdAndDate(String id, Date date)
    {
        for (int i = 0; i < features.length(); i++) {
            JSONObject feature = features.getJSONObject(i);
            String thisId = feature.getString(NeurologyFeature.JSON_KEY_ID);

            Date thisDate;
            try {
                thisDate = NeurologyFeature.dateFormat.parse(feature.getString(NeurologyFeature.JSON_KEY_DATE));
            } catch (ParseException e) {
                continue;
            }

            if (thisId.equals(id) && thisDate.equals(date)) {
                return feature;
            }
        }

        return null;
    }

    private JSONObject config;

    private JSONArray features;
}
