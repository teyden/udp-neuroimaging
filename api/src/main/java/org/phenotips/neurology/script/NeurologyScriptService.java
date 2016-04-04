/*
 * This file is subject to the terms and conditions defined in file LICENSE,
 * which is part of this source code package.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */
package org.phenotips.neurology.script;

import org.phenotips.neurology.internal.NeurologyFeatureSet;

import org.xwiki.bridge.DocumentAccessBridge;
import org.xwiki.component.annotation.Component;
import org.xwiki.script.service.ScriptService;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

import com.xpn.xwiki.api.Document;

@Component
@Named("neurology")
@Singleton
public class NeurologyScriptService implements ScriptService
{
    @Inject
    private DocumentAccessBridge documentAccessBridge;

    public String getFeatureSetJson(Document doc)
    {
        NeurologyFeatureSet featureSet = new NeurologyFeatureSet(doc.getDocument(), documentAccessBridge);

        return featureSet.toJson();
    }
}
