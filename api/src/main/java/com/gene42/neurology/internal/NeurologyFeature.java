/*
 * This file is subject to the terms and conditions defined in file LICENSE,
 * which is part of this source code package.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */
package com.gene42.neurology.internal;

import org.xwiki.bridge.DocumentAccessBridge;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.json.JSONObject;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.objects.BaseObject;

public class NeurologyFeature
{
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    private static final String JSON_KEY_IS_OBSERVED = "isObserved";
    private static final String JSON_KEY_ID = "id";
    private static final String JSON_KEY_COMMENTS = "comments";
    private static final String JSON_KEY_SPATIAL_PATTERN = "spatial_pattern";
    private static final String JSON_KEY_SEVERITY = "severity";
    private static final String JSON_KEY_DATE = "date";

    private final DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);

    public NeurologyFeature(JSONObject json)
    {
        isObserved = json.getBoolean(JSON_KEY_IS_OBSERVED);
        id = json.getString(JSON_KEY_ID);
        comments = json.optString(JSON_KEY_COMMENTS);
        try {
            date = dateFormat.parse(json.getString(JSON_KEY_DATE));
        } catch (ParseException e) {

        }
        JSONObject qualifiers = json.optJSONObject("qualifiers");
        if (qualifiers != null) {
            spatial_pattern = qualifiers.optString(JSON_KEY_SPATIAL_PATTERN);
            severity = qualifiers.optString(JSON_KEY_SEVERITY);
        }
    }

    public NeurologyFeature(BaseObject obj, DocumentAccessBridge bridge)
    {
        isObserved = checkboxValueToBoolean(obj.getStringValue(JSON_KEY_IS_OBSERVED));
        id = obj.getStringValue(JSON_KEY_ID);
        comments = obj.getStringValue(JSON_KEY_COMMENTS);
        date = obj.getDateValue(JSON_KEY_DATE);
        spatial_pattern = obj.getStringValue(JSON_KEY_SPATIAL_PATTERN);
        severity = obj.getStringValue(JSON_KEY_SEVERITY);
    }

    public JSONObject getJsonObj()
    {
        JSONObject feature = new JSONObject();
        feature.accumulate(JSON_KEY_ID, id);
        feature.accumulate(JSON_KEY_COMMENTS, comments);
        feature.accumulate(JSON_KEY_IS_OBSERVED, isObserved);

        feature.accumulate(JSON_KEY_DATE, dateFormat.format(date));

        JSONObject qualifiers = new JSONObject();
        if (!spatial_pattern.isEmpty()) {
            qualifiers.accumulate(JSON_KEY_SPATIAL_PATTERN, spatial_pattern);
        }
        if (!severity.isEmpty()) {
            qualifiers.accumulate(JSON_KEY_SEVERITY, severity);
        }
        if (qualifiers.length() > 0) {
            feature.accumulate("qualifiers", qualifiers);
        }

        return feature;
    }

    public void populateBaseObj(BaseObject obj, XWikiContext context)
    {
        obj.set(JSON_KEY_ID, id, context);
        obj.set(JSON_KEY_IS_OBSERVED, booleanToCheckboxValue(isObserved), context);
        obj.set(JSON_KEY_COMMENTS, comments, context);
        obj.set(JSON_KEY_DATE, dateFormat.format(date), context);
        obj.set(JSON_KEY_SPATIAL_PATTERN, spatial_pattern, context);
        obj.set(JSON_KEY_SEVERITY, severity, context);
    }

    private String id;

    private String comments;

    private Date date;

    private String spatial_pattern;

    private String severity;

    private Boolean isObserved;

    private Boolean checkboxValueToBoolean(String val)
    {
        if (val == null) {
            return null;
        }

        return "1".equals(val);
    }

    private String booleanToCheckboxValue(Boolean val)
    {
        if (val == null) {
            return null;
        }

        return val ? "1" : "0";
    }

    private Boolean jsonValueToBoolean(String val)
    {
        if (val == null) {
            return null;
        }

        return "yes".equals(val);
    }

    private String booleanToJsonValue(Boolean val)
    {
        if (val == null) {
            return null;
        }

        return val ? "yes" : "no";
    }
}
