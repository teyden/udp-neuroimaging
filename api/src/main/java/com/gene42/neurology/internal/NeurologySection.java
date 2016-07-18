package com.gene42.neurology.internal;

import org.xwiki.bridge.DocumentAccessBridge;

import java.util.LinkedList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.objects.BaseObject;

/**
 * Exposes methods for handling data from the neurology section in the patient form.
 *
 * XWiki data representation of the neurology section composed of a:
 *      (1) At the least, a single NeurologyMetaClass object containing a boolean XProperty for Clinical Status
 *      condition, and two textarea XProperties for comments
 *      (2) NeurologyFeatureClass objects representing neurology phenotype features, see {@code NeurologyFeature}
 *
 */
public class NeurologySection
{
    /**
     * Output of 'is_normal' XProperty, checkbox value '0'.
     */
    public static final String JSON_VALUE_UNAFFECTED = "unaffected";

    /**
     * Output of 'is_normal' XProperty, checkbox value '1'.
     */
    public static final String JSON_VALUE_AFFECTED = "affected";

    /**
     * Output key for the 'is_normal' XProperty.
     */
    public static final String JSON_KEY_CLINICAL_STATUS = "clinicalStatus";

    /**
     * Input key for the XProperty.
     */
    public static final String JSON_KEY_IS_NORMAL = "is_normal";

    /**
     * Input and output key for a neurology section textarea.
     */
    public static final String JSON_KEY_SECTION_NOTES = "section_notes";

    /**
     * Input and output key for an end-of-section textarea.
     */
    public static final String JSON_KEY_END_NOTES = "end_notes";

    /**
     * Input and output key for neurology phenotype features.
     */
    public static final String JSON_KEY_FEATURES = "features";

    private String clinicalStatus;

    private String isNormal;

    private String sectionNotes;

    private String endNotes;

    private List<NeurologyFeature> features = new LinkedList<>();

    /**
     * Constructor that copies data from a {@code PhenoTips.NeurologyMetaClass} object.
     *
     * Use cases: patient's neurological condition is unaffected, meaning there is no table data (Neurology phenotype
     * features) added to the NeurologySection object.
     *
     * @param metaObject The XObject containing the Clinical Status value of the patients neurological condition and
     * comments about the section.
     * @param bridge Provides access to the underlying data storage.
     */
    public NeurologySection(BaseObject metaObject, DocumentAccessBridge bridge)
    {
        isNormal = metaObject.getStringValue(JSON_KEY_IS_NORMAL);
        clinicalStatus = checkboxValueToJsonValue(metaObject.getStringValue(JSON_KEY_IS_NORMAL));
        sectionNotes = metaObject.getStringValue(JSON_KEY_SECTION_NOTES);
        endNotes = "";
        features = new LinkedList<>();
    }

    /**
     * Constructor that copies data from a {@code PhenoTips.NeurologyMetaClass} object, and a list of
     * {@code PhenoTips.NeurologyFeatureClass} objects.
     *
     * @param metaObject The XObject containing the Clinical Status value of the patients neurological condition.
     * @param featureObjects The list of XObjects representing neurology phenotype features in the neurology table.
     * @param bridge Provides access to the underlying data storage.
     */
    public NeurologySection(BaseObject metaObject, List<BaseObject> featureObjects, DocumentAccessBridge bridge)
    {
        isNormal = metaObject.getStringValue(JSON_KEY_IS_NORMAL);
        clinicalStatus = checkboxValueToJsonValue(metaObject.getStringValue(JSON_KEY_IS_NORMAL));
        sectionNotes = metaObject.getStringValue(JSON_KEY_SECTION_NOTES);
        endNotes = metaObject.getStringValue(JSON_KEY_END_NOTES);

        for (BaseObject object : featureObjects) {
            if (object == null || object.getFieldList().size() == 0) {
                continue;
            }

            features.add(new NeurologyFeature(object, bridge));
        }
    }

    /**
     * Constructor that copies the data from a json object.
     *
     * Use cases: when loading existing neurology data for a patient
     *
     * @param json The object containing neurology data. 
     */
    public NeurologySection(JSONObject json)
    {
        isNormal = jsonValueToCheckboxValue(json.optString(JSON_KEY_CLINICAL_STATUS));
        clinicalStatus = getClinicalStatusJsonValue(json.optString(JSON_KEY_CLINICAL_STATUS));
        sectionNotes = json.optString(JSON_KEY_SECTION_NOTES);
        endNotes = json.optString(JSON_KEY_END_NOTES);

        JSONArray featuresJson = json.optJSONArray(JSON_KEY_FEATURES);

        if (featuresJson != null) {
            for (int i = 0; i < featuresJson.length(); i++) {
                JSONObject featureJson = featuresJson.getJSONObject(i);
                NeurologyFeature feature = new NeurologyFeature(featureJson);
                features.add(feature);
            }
        }
    }

    /**
     * Creates a JSON object for the class.
     *
     * @return The JSON object.
     */
    public JSONObject getJsonObj()
    {
        JSONObject section = new JSONObject();
        section.accumulate(JSON_KEY_CLINICAL_STATUS, clinicalStatus);
        section.accumulate(JSON_KEY_SECTION_NOTES, sectionNotes);
        section.accumulate(JSON_KEY_END_NOTES, endNotes);

        JSONArray featuresJsonArray = new JSONArray();
        for (NeurologyFeature feature : features) {
            featuresJsonArray.put(feature.getJsonObj());
        }
        section.put(JSON_KEY_FEATURES, featuresJsonArray);

        return section;
    }

    /**
     * Sets XObject property values for the {@code PhenoTips.NeurologyMetaClass}.
     *
     * @param obj The object to be updated.
     * @param context The current XWiki context.
     */
    public void populateMetaObj(BaseObject obj, XWikiContext context)
    {
        obj.set(JSON_KEY_IS_NORMAL, isNormal, context);
        obj.set(JSON_KEY_SECTION_NOTES, sectionNotes, context);
        obj.set(JSON_KEY_END_NOTES, endNotes, context);
    }

    /**
     * Gets neurology features stored in the current class object.
     *
     * @return List of NeurologyFeature objects.
     */
    public List<NeurologyFeature> getFeatures()
    {
        return features;
    }

    private String checkboxValueToJsonValue(String val)
    {
        if (val == null) {
            return null;
        }

        return "1".equals(val) ? JSON_VALUE_UNAFFECTED : JSON_VALUE_AFFECTED;
    }

    private String jsonValueToCheckboxValue(String val)
    {
        if (val == null) {
            return null;
        }

        return val.equals(JSON_VALUE_UNAFFECTED) ? "0" : val.equals(JSON_VALUE_AFFECTED) ? "1" : "N/A";
    }

    private String getIsNormalJsonValue(String val)
    {
        if (val == null) {
            return null;
        }

        return "0".equals(val) || "1".equals(val) ? val : "N/A";
    }

    private String getClinicalStatusJsonValue(String val)
    {
        if (val == null) {
            return null;
        }

        return val.equals(JSON_VALUE_UNAFFECTED) || val.equals(JSON_VALUE_AFFECTED) ? val : "N/A";
    }
}
