package com.gene42.neurology.internal;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.objects.BaseObject;
import org.json.JSONArray;
import org.json.JSONObject;
import org.xwiki.bridge.DocumentAccessBridge;

import java.util.LinkedList;
import java.util.List;

public class NeurologySection
{
    public static final String JSON_VALUE_UNAFFECTED = "unaffected";
    public static final String JSON_VALUE_AFFECTED = "affected";

    public static final String JSON_KEY_CLINICAL_STATUS = "clinicalStatus";

    public static final String JSON_KEY_IS_NORMAL = "is_normal";
    public static final String JSON_KEY_SECTION_NOTES = "section_notes";
    public static final String JSON_KEY_END_NOTES = "end_notes";
    public static final String JSON_KEY_FEATURES = "features";

    private String clinical_status;

    private String is_normal;

    private String section_notes;

    private String end_notes;

    private List<NeurologyFeature> features = new LinkedList<>();

    /**
     * Constructor that adds only the XObject for neurology meta data and not the XObjects for neurology
     * features. Use cases: the is_normal property is checked meaning the patient's neurological condition
     * is unaffected therefore no other data in the neurology section is recorded.
     */
    public NeurologySection(BaseObject metaObject, DocumentAccessBridge bridge)
    {
        is_normal = metaObject.getStringValue(JSON_KEY_IS_NORMAL);
        clinical_status = checkboxValueToJsonValue(metaObject.getStringValue(JSON_KEY_IS_NORMAL));
        section_notes = metaObject.getStringValue(JSON_KEY_SECTION_NOTES);

        end_notes = "";
        features = new LinkedList<>();
    }

    public NeurologySection(JSONObject json)
    {
        is_normal = json.getString(JSON_KEY_IS_NORMAL);
        clinical_status = checkboxValueToJsonValue(json.getString(JSON_KEY_IS_NORMAL));
        section_notes = json.optString(JSON_KEY_SECTION_NOTES);
        end_notes = json.optString(JSON_KEY_END_NOTES);

        JSONArray featuresJson = json.optJSONArray(JSON_KEY_FEATURES);

        if (featuresJson != null) {
            for (int i = 0; i < featuresJson.length(); i++) {
                JSONObject featureJson = featuresJson.getJSONObject(i);
                NeurologyFeature feature = new NeurologyFeature(featureJson);
                features.add(feature);
            }
        }
    }

    public NeurologySection(BaseObject metaObject, DocumentAccessBridge bridge)
    {
        is_normal = metaObject.getStringValue(JSON_KEY_IS_NORMAL);
        clinical_status = checkboxValueToJsonValue(metaObject.getStringValue(JSON_KEY_IS_NORMAL));
        section_notes = metaObject.getStringValue(JSON_KEY_SECTION_NOTES);

        end_notes = "";
        features = new LinkedList<>();
    }

    public NeurologySection(BaseObject metaObject, List<BaseObject> featureObjects, DocumentAccessBridge bridge)
    {
        is_normal = metaObject.getStringValue(JSON_KEY_IS_NORMAL);
        clinical_status = checkboxValueToJsonValue(metaObject.getStringValue(JSON_KEY_IS_NORMAL));
        section_notes = metaObject.getStringValue(JSON_KEY_SECTION_NOTES);
        end_notes = metaObject.getStringValue(JSON_KEY_END_NOTES);

        for (BaseObject object : featureObjects) {
            if (object == null || object.getFieldList().size() == 0) {
                continue;
            }

            features.add(new NeurologyFeature(object, bridge));
        }
    }

    public JSONObject getJsonObj()
    {
        JSONObject section = new JSONObject();
        section.accumulate(JSON_KEY_CLINICAL_STATUS, clinical_status);
        section.accumulate(JSON_KEY_SECTION_NOTES, section_notes);
        section.accumulate(JSON_KEY_END_NOTES, end_notes);

        JSONArray featuresJsonArray = new JSONArray();
        for (NeurologyFeature feature : features) {
            featuresJsonArray.put(feature.getJsonObj());
        }
        section.put(JSON_KEY_FEATURES, featuresJsonArray);

        return section;
    }

    public void populateMetaObj(BaseObject obj, XWikiContext context)
    {
        obj.set(JSON_KEY_IS_NORMAL, is_normal, context);
        obj.set(JSON_KEY_SECTION_NOTES, section_notes, context);
        obj.set(JSON_KEY_END_NOTES, end_notes, context);
    }


    public List<NeurologyFeature> getFeatures() { return features; }

    public String getSectionNotes() { return section_notes; }

    public String getEndNotes() { return end_notes; }

    public String getClinicalStatus() { return clinical_status; }

    private String checkboxValueToJsonValue(String val)
    {
        if (val == null) {
            return null;
        }

        return "1".equals(val) ? JSON_VALUE_UNAFFECTED : JSON_VALUE_AFFECTED;
    }
}