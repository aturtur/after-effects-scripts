/*
AR_DivideLayersDuration

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_DivideLayersDuration
Description-US: Divides layers to sequence so total length is equal as the first selected layer's duration.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function DivideLayersDuration() {
    app.beginUndoGroup("AR_DivideLayersDuration"); // Begin undo group
    var comp = app.project.activeItem; // Get act5ive composition
    var layers = comp.selectedLayers; // Get selected layers
    var frameRate = 1 / comp.frameDuration; // Get frame rate
    if (layers.length > 0) { // If there is selected layer
        var duration = layers[0].outPoint-layers[0].inPoint; // Get first selected layer's duration
        for (var i = 0; i < layers.length; i++) { // Loop through selected layers
            var section = duration/layers.length; // Calculate duration for the part
            if (i != 0) { // If not first run
                layers[i].inPoint = nextOut; // Set layer's in point
                layers[i].outPoint = layers[i].inPoint+section; // Set layer's out point
                layers[i].outPoint = Math.round(layers[i].outPoint*frameRate)/frameRate; // Round out point so it is not between frames
            } else {
                layers[i].outPoint = layers[i].inPoint+section; // Set layer's out point
                layers[i].outPoint = Math.round(layers[i].outPoint*frameRate)/frameRate; // Round out point so it is not between frames
            }
            nextOut = layers[i].outPoint; // Get layer's next out point
        }
    }
    app.endUndoGroup(); // End undo group
}
DivideLayersDuration(); // Run the function