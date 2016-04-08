/*
 * This file is subject to the terms and conditions defined in file LICENSE,
 * which is part of this source code package.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */
package com.gene42.neurology.internal;

import org.phenotips.Constants;

import org.xwiki.bridge.DocumentAccessBridge;
import org.xwiki.model.EntityType;
import org.xwiki.model.reference.EntityReference;

import java.util.LinkedList;
import java.util.List;

import org.json.JSONArray;

import com.xpn.xwiki.doc.XWikiDocument;
import com.xpn.xwiki.objects.BaseObject;

public class NeurologyFeatureSet
{
    private static final EntityReference CLASS_REFERENCE = new EntityReference("NeurologyFeatureClass",
                        EntityType.DOCUMENT, Constants.CODE_SPACE_REFERENCE);

    public NeurologyFeatureSet(XWikiDocument doc, DocumentAccessBridge bridge)
    {
        List<BaseObject> xObjects = doc.getXObjects(CLASS_REFERENCE);
        features = new LinkedList<>();

        if (xObjects == null) {
            return;
        }
        for (BaseObject feature : xObjects) {
            if (feature == null) {
                continue;
            }

            NeurologyFeature neurologyFeature = new NeurologyFeature(feature, bridge);
            features.add(neurologyFeature);
        }
    }

    public String toJson()
    {
        JSONArray featuresJson = new JSONArray();
        for (NeurologyFeature feature : features) {
            featuresJson.put(feature.getJsonObj());
        }

        return featuresJson.toString();
    }

    private List<NeurologyFeature> features;
}
