/*
AR_ParentAbove

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ParentAbove
Description-US: Sets above layer to parent of the selected layer
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
function ParentAbove() {
    app.beginUndoGroup("AR_ParentAbove"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers // Get selected layers
        for (var i = 0; i < layers.length; i++){ // Loop through selected layers
            if (layers[i] != comp.layer(1)) { // If not first layer in composition
                layers[i].parent = comp.layer(layers[i].index-1); // Parent to above
            }
        }
    app.endUndoGroup(); // End undo group
}
ParentAbove(); // Run the script