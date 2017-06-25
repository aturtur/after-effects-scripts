// basic variables
var comp = app.project.activeItem;
var frameRate = 1 / comp.frameDuration;
var twod = PropertyValueType.TwoD_SPATIAL;
var threed = PropertyValueType.ThreeD_SPATIAL;
var layer = comp.selectedLayers[0];
var prop = layer.selectedProperties;
var selK = layer.selectedKeys;
var layerIn = layer.inPoint;
var layerOut = layer.outPoint;
var kv, kite, kote, kiit, koit, ktab, ktc, kist, kost, ksab, ksc;
var firstKey, lastKey, keysCount, t;

app.beginUndoGroup("distribute keyframes");
for (var i = 0; i < prop[0].selectedKeys.length; i++) {
    keysCount = prop[0].selectedKeys.length;
    firstKey = prop[0].selectedKeys[0];
    lastKey = prop[0].selectedKeys[keysCount-1];
    firstTime = prop[0].keyTime(prop[0].selectedKeys[0]);
    lastTime = prop[0].keyTime(prop[0].selectedKeys[keysCount-1]);
    // arrays
    kv   = [ ];
    kite = [ ];
    kote = [ ];
    kiit = [ ];
    koit = [ ];
    ktab = [ ];
    ktc  = [ ];
    kist = [ ];
    kost = [ ];
    ksab = [ ];
    ksc  = [ ];
    // store data
    for (var k = firstKey; k <= lastKey; k++) {
        kv[kv.length] = prop[0].keyValue(k);
        kiit[kiit.length] = prop[0].keyInInterpolationType(k);
        koit[koit.length] = prop[0].keyOutInterpolationType(k);
        kite[kite.length] = prop[0].keyInTemporalEase(k);
        kote[kote.length] = prop[0].keyOutTemporalEase(k);
        ktab[ktab.length] = prop[0].keyTemporalAutoBezier(k);
        ktc[ktc.length] = prop[0].keyTemporalContinuous(k);

        if (prop[0].propertyValueType == twod || prop[0].propertyValueType == threed) {
            ksab[ksab.length] = prop[0].keySpatialAutoBezier(k);
            ksc[ksc.length] = prop[0].keySpatialContinuous(k);
            kist[kist.length] = prop[0].keyInSpatialTangent(k);
            kost[kost.length] = prop[0].keyOutSpatialTangent(k);
        }
    }
    // remove old keyframes
    for (var k = firstKey; k <= lastKey; k++) {
        prop[i].removeKey(firstKey);
    }
    // add new keyframes
    t = 0;
    for (var s = firstKey; s <= lastKey; s++){
        method = firstTime + (lastTime - firstTime) / (keysCount - 1) * (t);
        //alert(prop[0].keyTime(prop[0].selectedKeys[0]));
        prop[0].setValueAtTime(method, kv[t]);
        prop[0].setTemporalEaseAtKey(s, kite[t], kote[t]);
        prop[0].setInterpolationTypeAtKey(s, kiit[t], koit[t]);
        prop[0].setTemporalContinuousAtKey(s, ktc[t]);
        prop[0].setTemporalAutoBezierAtKey(s, ktab[t]);

        if(prop[0].propertyValueType == twod || prop[0].propertyValueType == threed) {
            prop[0].setSpatialTangentsAtKey(s, kist[t], kost[t]);
            prop[0].setSpatialAutoBezierAtKey(s, ksab[t]);
            prop[0].setSpatialContinuousAtKey(s, ksc[t]);
        }
        t++;
    }
}
app.endUndoGroup();
