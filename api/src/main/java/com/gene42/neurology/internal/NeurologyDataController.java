package com.gene42.neurology.internal;

import org.phenotips.Constants;
import org.phenotips.data.Patient;
import org.phenotips.data.PatientData;
import org.phenotips.data.PatientDataController;
import org.phenotips.data.SimpleValuePatientData;

import org.xwiki.bridge.DocumentAccessBridge;
import org.xwiki.component.annotation.Component;
import org.xwiki.model.EntityType;
import org.xwiki.model.reference.EntityReference;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;
import javax.inject.Singleton;

import org.json.JSONObject;
import org.slf4j.Logger;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.doc.XWikiDocument;
import com.xpn.xwiki.objects.BaseObject;

/**
 * Handles neurology information.
 *
 * @version $Id$
 */
@Component(roles = { PatientDataController.class })
@Named("neurology")
@Singleton
public class NeurologyDataController implements PatientDataController<NeurologySection>
{
    /**
     * The XClass used for storing neurology meta data.
     */
    public static final EntityReference NEUROLOGY_META_CLASS_REFERENCE = new EntityReference("NeurologyMetaClass",
        EntityType.DOCUMENT, Constants.CODE_SPACE_REFERENCE);

    /**
     * The XClass used for storing neurology feature data.
     */
    public static final EntityReference NEUROLOGY_FEATURE_CLASS_REFERENCE = new EntityReference("NeurologyFeatureClass",
        EntityType.DOCUMENT, Constants.CODE_SPACE_REFERENCE);

    private static final String NEUROLOGY_STRING = "neurology";

    private static final String CONTROLLER_NAME = NEUROLOGY_STRING;

    /**
     * Provides access to the underlying data storage.
     */
    @Inject
    protected DocumentAccessBridge documentAccessBridge;

    @Inject
    private Logger logger;

    /**
     * Provides access to the current execution context.
     */
    @Inject
    private Provider<XWikiContext> xcontextProvider;

    /**
     * Returns name of controller.
     */
    @Inject
    public String getName()
    {
        return CONTROLLER_NAME;
    }

    @Override
    public PatientData<NeurologySection> load(Patient patient)
    {
        try {
            XWikiDocument doc = (XWikiDocument) this.documentAccessBridge.getDocument(patient.getDocument());

            BaseObject metaObject = doc.getXObject(NEUROLOGY_META_CLASS_REFERENCE);
            List<BaseObject> featureObjects = doc.getXObjects(NEUROLOGY_FEATURE_CLASS_REFERENCE);

            if (metaObject == null) {
                this.logger.debug("No neurology data found, returning");
                return null;
            }

            int isNormal = metaObject.getIntValue(NeurologySection.JSON_KEY_IS_NORMAL);
            if (isNormal == 1) {
                return new SimpleValuePatientData<>(getName(), new NeurologySection(metaObject, documentAccessBridge));
            } else if (isNormal == 0) {
                if (featureObjects == null || featureObjects.isEmpty()) {
                    this.logger.debug("No neurology feature data found, returning");
                    return null;
                }

                NeurologySection section = new NeurologySection(metaObject, featureObjects, documentAccessBridge);
                return new SimpleValuePatientData<>(getName(), section);
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
        PatientData<NeurologySection> data = patient.getData(getName());
        if (data == null) {
            return;
        }

        NeurologySection section = data.getValue();
        json.put(CONTROLLER_NAME, section.getJsonObj());
    }

    @Override
    public PatientData<NeurologySection> readJSON(JSONObject json)
    {
        if (json == null || !json.has(CONTROLLER_NAME)) {
            return null;
        }
        try {
            JSONObject sectionJson = json.getJSONObject(CONTROLLER_NAME);
            NeurologySection section = new NeurologySection(sectionJson);

            return new SimpleValuePatientData<>(getName(), section);
        } catch (Exception e) {
            this.logger.error("Could not load neurology features from JSON: [{}]", e.getMessage());
        }
        return null;
    }

    @Override
    public void save(Patient patient)
    {
        try {
            PatientData<NeurologySection> data = patient.getData(this.getName());
            if (data == null || data.getValue() == null) {
                return;
            }

            XWikiDocument doc = (XWikiDocument) this.documentAccessBridge.getDocument(patient.getDocument());
            if (doc == null) {
                throw new NullPointerException(ERROR_MESSAGE_NO_PATIENT_CLASS);
            }

            XWikiContext context = this.xcontextProvider.get();
            doc.removeXObjects(NEUROLOGY_META_CLASS_REFERENCE);
            doc.removeXObjects(NEUROLOGY_FEATURE_CLASS_REFERENCE);

            NeurologySection section = data.getValue();

            BaseObject metaObject = doc.newXObject(NEUROLOGY_META_CLASS_REFERENCE, context);
            section.populateMetaObj(metaObject, context);

            Iterator<NeurologyFeature> iterator = section.getFeatures().iterator();
            while (iterator.hasNext()) {
                try {
                    NeurologyFeature feature = iterator.next();
                    BaseObject featureObject = doc.newXObject(NEUROLOGY_FEATURE_CLASS_REFERENCE, context);

                    feature.populateBaseObj(featureObject, context);
                } catch (Exception e) {
                    this.logger.error("Failed to save a specific feature: [{}]", e.getMessage());
                }
            }

            context.getWiki().saveDocument(doc, "Updated neurology data", true, context);
        } catch (Exception e) {
            this.logger.error("Failed to save neurology data: [{}]", e.getMessage());
        }
    }
}
