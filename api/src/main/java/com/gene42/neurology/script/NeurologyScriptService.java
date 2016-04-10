/*
 * This file is subject to the terms and conditions defined in file LICENSE,
 * which is part of this source code package.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */
package com.gene42.neurology.script;

import org.xwiki.bridge.DocumentAccessBridge;
import org.xwiki.component.annotation.Component;
import org.xwiki.model.reference.DocumentReference;
import org.xwiki.script.service.ScriptService;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;
import javax.inject.Singleton;

import org.json.JSONObject;

import com.gene42.neurology.internal.NeurologyFeatureSet;
import com.gene42.neurology.internal.NeurologyFeaturesTableGenerator;
import com.xpn.xwiki.XWikiContext;
import com.xpn.xwiki.api.Document;
import com.xpn.xwiki.doc.XWikiDocument;

@Component
@Named("neurology")
@Singleton
public class NeurologyScriptService implements ScriptService
{
    @Inject
    private DocumentAccessBridge documentAccessBridge;

    /** Provides access to the current execution context. */
    @Inject
    private Provider<XWikiContext> xcontextProvider;

    public String getFeatureSetJson(Document doc)
    {
        NeurologyFeatureSet featureSet = new NeurologyFeatureSet(doc.getDocument(), documentAccessBridge);

        return featureSet.toJson();
    }

    public String getFeatureSetViewHtml(Document doc) throws Exception
    {
        NeurologyFeatureSet features = new NeurologyFeatureSet(doc.getDocument(), documentAccessBridge);

        NeurologyFeaturesTableGenerator tableGen =
                new NeurologyFeaturesTableGenerator(features.toJsonArray(), getNeurologyTableConfig());

        return tableGen.getHtml();
    }

    public JSONObject getNeurologyTableConfig() throws Exception
    {
        XWikiDocument configDoc = (XWikiDocument)
                documentAccessBridge.getDocument(new DocumentReference("xwiki", "PhenoTips", "NeurologyTableCode"));

        return new JSONObject(configDoc.getContent());
    }
}
