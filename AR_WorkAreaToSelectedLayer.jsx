/*
AR_WorkAreaToSelectedLayer

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_WorkAreaToSelectedLayer
Description-US: Trims work area to match selected layer(s) extreme in and out point.
Written for Adobe After Effects CC 2019 (Version 16.1.0 Build 208)
*/
//@target aftereffects
function WorkAreaToSelectedLayer(){
    app.beginUndoGroup("AR_WorkAreaToSelectedLayer"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layer
    var collection = []; // Initialize list for in and out point values
    for(var i = 0; i < layers.length; i++ ) {
        collection.push(layers[i].inPoint); // Add layer's in point to collection
        collection.push(layers[i].outPoint); // Add layer's out point to collection
    }
    var min = Math.min.apply(Math, collection); // Get minimum value of collection
    var max = Math.max.apply(Math, collection); // Get maximum value of collection
    comp.workAreaStart = min; // Set work area start point
    comp.workAreaDuration = max-min; // Set work area duration 
    app.endUndoGroup(); // End undo group 
}
WorkAreaToSelectedLayer() // Tun the function