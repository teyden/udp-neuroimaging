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
import java.text.SimpleDateFormat;
import java.util.Date;
import org.json.JSONObject;

import com.xpn.xwiki.objects.BaseObject;

public class NeurologyFeature
{
    private static final String DATE_FORMAT = "yyyy-MM-dd";

    public NeurologyFeature(BaseObject obj, DocumentAccessBridge bridge)
    {
        isObserved = checkboxValueToBoolean(obj.getStringValue("isObserved"));
        term = obj.getStringValue("term");
        comments = obj.getStringValue("comments");
        date = obj.getDateValue("date");
        spatial_pattern = obj.getStringValue("spatial_pattern");
        severity = obj.getStringValue("severity");
    }

    public JSONObject getJsonObj()
    {
        JSONObject feature = new JSONObject();
        feature.accumulate("term", term);
        feature.accumulate("comments", comments);
        feature.accumulate("isObserved", isObserved);

        DateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        feature.accumulate("date", dateFormat.format(date));

        JSONObject qualifiers = new JSONObject();
        if (!spatial_pattern.isEmpty()) {
            qualifiers.accumulate("spatial_pattern", spatial_pattern);
        }
        if (!severity.isEmpty()) {
            qualifiers.accumulate("severity", severity);
        }
        if (qualifiers.length() > 0) {
            feature.accumulate("qualifiers", qualifiers);
        }

        return feature;
    }

    private String term;

    private String comments;

    private Date date;

    private String spatial_pattern;

    private String severity;

    private boolean isObserved;

    private boolean checkboxValueToBoolean(String val)
    {
        return "1".equals(val);
    }
}
