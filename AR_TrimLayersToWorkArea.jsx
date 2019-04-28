/*
AR_TrimLayersToWorkArea

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_TrimLayersToWorkArea
Description-US: Trims selected layers' in and out points to match work area
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function TrimLayersToWorkArea() {
    app.beginUndoGroup("AR_TrimLayersToWorkArea"); 
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var workAreaIn = comp.workAreaStart; // Get work area in point
    var workAreaOut = comp.workAreaStart+comp.workAreaDuration; // Get work area out point
    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
            layers[i].inPoint = workAreaIn; // Set layer in point
            layers[i].outPoint = workAreaOut; // Set layer out point
    }
    app.endUndoGroup(); // End undo group
}
TrimLayersToWorkArea(); // Run the function