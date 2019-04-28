/*
AR_AddExpMantainScaleWhenParented

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_AddExpMantainScaleWhenParented
Description-US: Adds expression to selected layers' scale proprty, so layer maintains scale when it is parented and parent's scale is changing.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function AddExpMantainScaleWhenParented() {
    app.beginUndoGroup("AR_AddExpMantainScaleWhenParented"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    if (layers != 0) { // If there is any selected layer
        for (var i = 0; i < layers.length; i++) { // Iterate through selected layers
            layers[i].scale.expression = "s = []; ps = parent.transform.scale.value; for (i = 0; i < ps.length; i++){ s[i] = value[i]*100/ps[i]; } s"; // Add expression to 'scale' property
        }
    }
    app.endUndoGroup(); // End undo group
}
AddExpMantainScaleWhenParented(); // Run the function