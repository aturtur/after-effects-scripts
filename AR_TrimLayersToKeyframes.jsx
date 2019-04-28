/*
AR_TrimLayersToKeyframes

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_TrimLayersToKeyframes
Description-US: Trims selected layers' in and out points to match layer's first and last keyframe
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
var  keyTimes = []; // Global list to store all keyframe times
function collectAllKeyFrameTimes(propGroup) {
// This is customized function from http://www.redefinery.com/ae/fundamentals/properties/ (scanPropGroupProperties)
    for (var i = 1; i <= propGroup.numProperties; i++) { // Iterate over the specified property group's properties
        var prop = propGroup.property(i);
        if (prop.propertyType === PropertyType.PROPERTY) { // Found a property
            if (prop.numKeys != 0) { // If there is keyframes
                for (var k = 1; k <= prop.numKeys; k++) { keyTimes.push(prop.keyTime(k)); } } }
        else if ((prop.propertyType === PropertyType.INDEXED_GROUP) || (prop.propertyType === PropertyType.NAMED_GROUP)) { // Found an indexed or named group, so check its nested properties
            collectAllKeyFrameTimes(prop);
        }
    }
}
function TrimLayersToKeyframes() {
    app.beginUndoGroup("AR_TrimLayersToKeyframes"); 
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var keyMaster = []; // Initialize list for keyframes
    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
        collectAllKeyFrameTimes(layers[i]);
        var min = Math.min.apply(Math, keyTimes); // Get minimum value of 'keyframe times' list
        var max = Math.max.apply(Math, keyTimes); // Get maximum value of 'keyframe times' list
        layers[i].inPoint = min; // Set layer in point
        layers[i].outPoint = max; // Set layer out point
    }
    app.endUndoGroup(); // End undo group
}
TrimLayersToKeyframes(); // Run the function
