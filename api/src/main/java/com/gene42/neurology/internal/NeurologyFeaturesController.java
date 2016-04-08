package com.gene42.neurology.internal;

import org.phenotips.Constants;
import org.phenotips.data.IndexedPatientData;
import org.phenotips.data.Patient;
import org.phenotips.data.PatientData;
import org.phenotips.data.PatientDataController;

import org.xwiki.bridge.DocumentAccessBridge;
import org.xwiki.component.annotation.Component;
import org.xwiki.model.EntityType;
import org.xwiki.model.reference.EntityReference;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;
import javax.inject.Singleton;

import org.slf4j.Logger;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.doc.XWikiDocument;
import com.xpn.xwiki.objects.BaseObject;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component(roles = { PatientDataController.class })
@Named("neurology")
@Singleton
public class NeurologyFeaturesController implements PatientDataController<NeurologyFeature>
{
    /** The XClass used for storing gene data. */
    public static final EntityReference NEUROLOGY_CLASS_REFERENCE = new EntityReference("NeurologyFeatureClass",
            EntityType.DOCUMENT, Constants.CODE_SPACE_REFERENCE);

    private static final String NEUROLOGY_STRING = "neurology";

    private static final String CONTROLLER_NAME = NEUROLOGY_STRING;

    /** Provides access to the underlying data storage. */
    @Inject
    protected DocumentAccessBridge documentAccessBridge;

    @Inject
    private Logger logger;

    /** Provides access to the current execution context. */
    @Inject
    private Provider<XWikiContext> xcontextProvider;

    @Inject
    public String getName()
    {
        return CONTROLLER_NAME;
    }

    @Override
    public PatientData<NeurologyFeature> load(Patient patient)
    {
        try {
            XWikiDocument doc = (XWikiDocument) this.documentAccessBridge.getDocument(patient.getDocument());
            List<BaseObject> baseObjects = doc.getXObjects(NEUROLOGY_CLASS_REFERENCE);
            if (baseObjects == null || baseObjects.isEmpty()) {
                this.logger.debug("No neurology information found, returning");
                return null;
            }

            List<NeurologyFeature> features = new LinkedList<NeurologyFeature>();
            for (BaseObject baseObject : baseObjects) {
                if (baseObject == null || baseObject.getFieldList().size() == 0) {
                    continue;
                }

                features.add(new NeurologyFeature(baseObject, documentAccessBridge));
            }
            if (features.isEmpty()) {
                return null;
            } else {
                return new IndexedPatientData<NeurologyFeature>(getName(), features);
            }
        } catch (Exception e) {
            this.logger.error("Could not find requested document or some unforeseen "
                    + "error has occurred during controller loading ", e.getMessage());
        }
        return null;
    }

    @Override
    public void writeJSON(Patient patient, JSONObject json)
    {
        writeJSON(patient, json, null);
    }

    @Override
    public void writeJSON(Patient patient, JSONObject json, Collection<String> selectedFieldNames)
    {
        if (selectedFieldNames != null && !selectedFieldNames.contains(CONTROLLER_NAME)) {
            return;
        }

        PatientData<NeurologyFeature> data = patient.getData(getName());
        if (data == null) {
            return;
        }
        Iterator<NeurologyFeature> iterator = data.iterator();
        if (!iterator.hasNext()) {
            return;
        }

        // put() is placed here because we want to create the property iff at least one field is set/enabled
        // (by this point we know there is some data since iterator.hasNext() == true)
        json.put(CONTROLLER_NAME, new JSONArray());
        JSONArray container = json.getJSONArray(CONTROLLER_NAME);

        while (iterator.hasNext()) {
            NeurologyFeature feature = iterator.next();

            container.add(feature.getJsonObj());
        }
    }

    @Override
    public PatientData<NeurologyFeature> readJSON(JSONObject json)
    {
        if (json == null || !json.has(CONTROLLER_NAME)) {
            return null;
        }

        try {
            JSONArray featuresJson = json.getJSONArray(CONTROLLER_NAME);
            List<NeurologyFeature> features = new LinkedList<NeurologyFeature>();
            for (int i = 0; i < featuresJson.size(); ++i) {
                JSONObject featureJson = featuresJson.getJSONObject(i);
                NeurologyFeature feature = new NeurologyFeature(new org.json.JSONObject(featureJson));

                features.add(feature);
            }

            if (features.isEmpty()) {
                return null;
            } else {
                return new IndexedPatientData<NeurologyFeature>(getName(), features);
            }
        } catch (Exception e) {
            this.logger.error("Could not load neurology features from JSON", e.getMessage());
        }
        return null;
    }

    @Override
    public void save(Patient patient)
    {
        try {
            PatientData<NeurologyFeature> features = patient.getData(this.getName());
            if (features == null || !features.isIndexed()) {
                return;
            }

            XWikiDocument doc = (XWikiDocument) this.documentAccessBridge.getDocument(patient.getDocument());
            if (doc == null) {
                throw new NullPointerException(ERROR_MESSAGE_NO_PATIENT_CLASS);
            }

            XWikiContext context = this.xcontextProvider.get();
            doc.removeXObjects(NEUROLOGY_CLASS_REFERENCE);
            Iterator<NeurologyFeature> iterator = features.iterator();
            while (iterator.hasNext()) {
                try {
                    NeurologyFeature feature = iterator.next();
                    BaseObject xwikiObject = doc.newXObject(NEUROLOGY_CLASS_REFERENCE, context);

                    feature.populateBaseObj(xwikiObject, context);
                } catch (Exception e) {
                    this.logger.error("Failed to save a specific feature: [{}]", e.getMessage());
                }
            }

            context.getWiki().saveDocument(doc, "Updated neurology features from JSON", true, context);
        } catch (Exception e) {
            this.logger.error("Failed to neurology features: [{}]", e.getMessage());
        }
    }
}
