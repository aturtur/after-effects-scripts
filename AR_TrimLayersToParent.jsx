/*
AR_TrimLayersToParent

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_TrimLayersToParent
Description-US: Trims selected layers' in and out points to match their parent layer(s)
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function TrimLayersToParent() {
    app.beginUndoGroup("AR_TrimLayersToParent"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var parentLayer; // Initialize variable
    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
        if (layers[i].parent != null) { // If layer has a parent
            parentLayer = comp.layer(layers[i].parent.index);
            layers[i].inPoint = parentLayer.inPoint; // Set layer in point
            layers[i].outPoint = parentLayer.outPoint; // Set layer out point
        }
    }
    app.endUndoGroup(); // End undo group
}
TrimLayersToParent(); // Run the function
