/*
AR_SequenceLayers

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_SequenceLayers
Description-US: Sequences selected layers one by one
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function SequenceLayers() {
    app.beginUndoGroup("AR_SequenceLayers"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var prevStart = layers[0].startTime; // Get first selected frame's start time
    var prevIn = layers[0].inPoint; // Get first selected frame's in point
    var prevOut = layers[0].outPoint; // Get first selected frame's out point
    var sub; // Initialize variable
    for (var i = 1; i < layers.length; i++) { // Loop through selected frames
        sub = layers[i].inPoint - layers[i].startTime; // Calculate time substraction
        layers[i].startTime = prevOut - sub; // Set layer's start time
        prevStart = layers[i].startTime; // Set current layer's start time for reference to next
        prevIn = layers[i].inPoint; // Set current layer's in point for reference to next
        prevOut = layers[i].outPoint; // Set current layer's out point for reference to next
    }
    app.endUndoGroup(); // End undo group
}
SequenceLayers(); // Run the function