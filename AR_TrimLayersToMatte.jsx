/*
AR_TrimLayersToMatte

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_TrimLayersToMatte
Description-US: Trims selected layers' in and out points to match their matte layer(s)
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function TrimLayersToMatte() {
    app.beginUndoGroup("AR_TrimLayersToMatte"); 
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var matteLayer; // Initialise variable
    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
        if (layers[i].hasTrackMatte) { // If layer has matte
            matteLayer = comp.layer(layers[i].index - 1); // Get matte layer
            layers[i].inPoint = matteLayer.inPoint; // Set layer in point
            layers[i].outPoint = matteLayer.outPoint; // Set layer out point
        }
    }
    app.endUndoGroup(); // End undo group
}
TrimLayersToMatte(); // Run the function