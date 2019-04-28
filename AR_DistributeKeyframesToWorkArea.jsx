/*
AR_DistributeKeyframesToWorkArea

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_DistributeKeyframesEvenly
Description-US: Distributes selected keys to work area. Supports multiple selections, but does not support multiple selections on same property.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function removeKeyframes(array) {
    for (var i = 0; i < array.length; i++) { // Loop through array
        for (var j = array[i]["FirstKey"]; j <= array[i]["LastKey"]; j++) { // Loop through keyframes
            array[i]["property"].removeKey(array[i]["FirstKey"]); // Remove keyframe
}}} // :3
function newKeyframes(array) {
    var comp = app.project.activeItem; // Get active composition
    var workAreaIn = comp.workAreaStart; // Get work area in point
    var workAreaOut = workAreaIn + comp.workAreaDuration; // Get work area out point
    for (var i = 0; i < array.length; i++) { // Loop through array
        var t = 0; // Initialize iteration variable
        for (var s = array[i]["FirstKey"]; s <= array[i]["LastKey"]; s++){ // Loop through keyframes
            var method = workAreaIn + (workAreaOut - workAreaIn) / (array[i]["KeyCount"] - 1) * (t); // Distribute keyframes to work area (core algorithm)
            var prop = array[i]["property"]; // Get property from array
            prop.setValueAtTime(method, array[i]["KV"][t]); // Set keyframe value
            prop.setTemporalEaseAtKey(s, array[i]["KITE"][t], array[i]["KOTE"][t]); // Set temporal ease
            prop.setInterpolationTypeAtKey(s, array[i]["KIIT"][t], array[i]["KOIT"][t]); // Set interpolation type
            prop.setTemporalContinuousAtKey(s, array[i]["KTC"][t]); // Set temporal continuity
            prop.setTemporalAutoBezierAtKey(s, array[i]["KTAB"][t]); // Set temporal auto-Bezier interpolation
            if(prop.propertyValueType == PropertyValueType.TwoD_SPATIAL || prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL) { // If property has two or threedimensional input
                prop.setSpatialTangentsAtKey(s, array[i]["KIST"][t], array[i]["KOST"][t]); // Set incoming and outgoing tangent vectors 
                prop.setSpatialAutoBezierAtKey(s, array[i]["KSAB"][t]); // Set spatial auto-Bezier interpolation
                prop.setSpatialContinuousAtKey(s, array[i]["KSC"][t]); // Set spatial continuity
            }
            t++; // Increase by one
}}} // :3
function storeKeyframeData(array) {
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    for (var layer = 0; layer < layers.length; layer++) { // Loop through selected layers
        var props = layers[layer].selectedProperties; // Get selected properties
        for (var p = 0; p < props.length; p++) { // Loop through selected properties
            var kv, kite, kote, kiit, koit, ktab, ktc, kist, kost, ksab, ksc; // Initialize variables
            var firstKey, lastKey, keysCount, t; // Initialize variables
            if (!(props[p] instanceof PropertyGroup)) { // If property is not  a property group
                var prop = props[p]; // Assign current prop to new variable
                var itemNum = array.length; // Current index for property in array
                array[itemNum] = {"property": prop, "layer": layers[layer]}; // Add property to the array
                for (var i = 0; i < prop.selectedKeys.length; i++) { // Loop through selected keys
                    keysCount = prop.selectedKeys.length; // Get selected keys
                    array[itemNum]["KeyCount"] = keysCount;
                    firstKey = prop.selectedKeys[0]; // Get first selected key
                    array[itemNum]["FirstKey"] = firstKey;
                    lastKey = prop.selectedKeys[keysCount-1]; // Get last selected key
                    array[itemNum]["LastKey"] = lastKey;
                    firstTime = prop.keyTime(prop.selectedKeys[0]); // Get first key's time
                    array[itemNum]["FirstTime"] = firstTime;
                    lastTime = prop.keyTime(prop.selectedKeys[keysCount-1]); // Get last key's time
                    array[itemNum]["LastTime"] = lastTime;
                    kv = []; kite = []; kote = []; kiit = []; koit = []; ktab = []; ktc  = []; kist = []; kost = []; ksab = []; ksc = []; // Empty arrays
                    for (var k = firstKey; k <= lastKey; k++) { // Loop through keyframes
                        kv[kv.length] = prop.keyValue(k); // Get keyframe's current value
                        kiit[kiit.length] = prop.keyInInterpolationType(k); // Get 'In interpolation type'
                        koit[koit.length] = prop.keyOutInterpolationType(k); // Get 'Out interpolation type'
                        kite[kite.length] = prop.keyInTemporalEase(k); // Get 'Incoming temporal ease'
                        kote[kote.length] = prop.keyOutTemporalEase(k); // Get 'Outgoing temporal ease'
                        ktab[ktab.length] = prop.keyTemporalAutoBezier(k); // Get status of 'Temporal auto-Bezier interpolation'
                        ktc[ktc.length] = prop.keyTemporalContinuous(k); // Get status of 'Temporal continuity'
                        if (prop.propertyValueType == PropertyValueType.TwoD_SPATIAL || prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL) { // If property has two or threedimensional input
                            ksab[ksab.length] = prop.keySpatialAutoBezier(k); // Get status of 'Spatial auto-Bezier interpolation'
                            ksc[ksc.length] = prop.keySpatialContinuous(k); // Get status of 'Spatial continuity'
                            kist[kist.length] = prop.keyInSpatialTangent(k); // Get 'Incoming spatial tangent'
                            kost[kost.length] = prop.keyOutSpatialTangent(k); // Get 'Outgoing spatial tangent'
                        }
                        array[itemNum]["KV"] = kv; // Add keyframe values list to the array
                        array[itemNum]["KITE"] = kite; // Add incoming temporal ease values list to array
                        array[itemNum]["KOTE"] = kote; // Add outgoing temporal ease values list to array
                        array[itemNum]["KIIT"] = kiit; // Add in interpolation type values list to array
                        array[itemNum]["KOIT"] = koit; // Add out interpolation type values list to array
                        array[itemNum]["KTAB"] = ktab; // Add temporal auto-Bezier interpoation values list to the array
                        array[itemNum]["KTC"] = ktc; // Add temporal continuity values list to the array
                        array[itemNum]["KIST"] = kist; // Add incoming spatial tangent values list to the array
                        array[itemNum]["KOST"] = kost; // Add outgoing spatial tangent values list to the array
                        array[itemNum]["KSAB"] = ksab; // Add spatial auto-Bezier interpolation values list to the array
                        array[itemNum]["KSC"] = ksc; // Add spatial continuity values list to the array
}}}}}} // :3
app.beginUndoGroup("AR_DistributeKeyframesToWorkArea"); // Begin undo group
var vault = []; // Initialize array for storing everything necessary
storeKeyframeData(vault); // Store keyframe data
removeKeyframes(vault); // Remove old keyframes
newKeyframes(vault); // Create new keyframes
app.endUndoGroup(); // End undo group