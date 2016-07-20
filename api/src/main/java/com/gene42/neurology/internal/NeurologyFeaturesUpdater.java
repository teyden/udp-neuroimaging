package com.gene42.neurology.internal;

import org.phenotips.Constants;
import org.phenotips.data.events.PatientChangingEvent;

import org.xwiki.component.annotation.Component;
import org.xwiki.container.Container;
import org.xwiki.container.servlet.ServletRequest;
import org.xwiki.context.Execution;
import org.xwiki.model.EntityType;
import org.xwiki.model.reference.EntityReference;
import org.xwiki.observation.AbstractEventListener;
import org.xwiki.observation.event.Event;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;

import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.doc.XWikiDocument;
import com.xpn.xwiki.objects.BaseObject;


@Component
@Named("neurology-features-updater")
@Singleton
public class NeurologyFeaturesUpdater extends AbstractEventListener
{
    /** The name of the class where the mapping between phenotypes and categories is stored. */
    private static final EntityReference NEUROLOGY_CLASS_REFERENCE = new EntityReference("NeurologyFeatureClass",
            EntityType.DOCUMENT, Constants.CODE_SPACE_REFERENCE);

    @Inject
    private Execution execution;

    @Inject
    private Logger logger;

    /** Needed for getting access to the request. */
    @Inject
    private Container container;

    /** Default constructor, sets up the listener name and the list of events to subscribe to. */
    public NeurologyFeaturesUpdater()
    {
        super("neurology-features-updater", new PatientChangingEvent());
    }

    @Override
    public void onEvent(Event event, Object source, Object data)
    {
        if (this.container.getRequest() == null) {
            // Not a browser request, no neurology features, nothing to do
            return;
        }
        XWikiContext context = (XWikiContext) this.execution.getContext().getProperty("xwikicontext");
        XWikiDocument doc = (XWikiDocument) source;

        BaseObject metaObject = doc.getXObject(NeurologyDataController.NEUROLOGY_META_CLASS_REFERENCE);
        if (metaObject.getIntValue(NeurologySection.JSON_KEY_IS_NORMAL) == 1) {
            doc.removeXObjects(NeurologyDataController.NEUROLOGY_FEATURE_CLASS_REFERENCE);
            return;
        }

        String tableState = ((ServletRequest) this.container.getRequest()).getHttpServletRequest()
                .getParameter("neurology_table_state");
        if (tableState == null) {
            return;
        }

        JSONObject tableStateJson;
        JSONArray feauturesJson;
        try {
            tableStateJson = new JSONObject(tableState);
            feauturesJson = tableStateJson.getJSONArray("neurology");
        } catch (JSONException e) {
            this.logger.warn("Failed to parse neurology table JSON: [{}]", e.getMessage());
            return;
        }

        List<NeurologyFeature> features = new LinkedList<>();
        for (int i = 0; i < feauturesJson.length(); i++) {
            JSONObject featureJson = feauturesJson.getJSONObject(i);
            NeurologyFeature feature = new NeurologyFeature(featureJson);
            features.add(feature);
        }

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
    }
}
