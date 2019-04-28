/*
AR_QuickFades

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_QuickFades
Description-US: Adds fades to selected layers
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function QuickFades() {
    app.beginUndoGroup("AR_QuickFades"); // Begin undo group
    var fade = prompt("Fade duration in frames"); // User input for fade duration
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var fps = 1 / comp.frameDuration; // Get frame rate
    for (var i = 0; i < layers.length; i++) { // Loop through frames
        layers[i].opacity.setValueAtTime(layers[i].inPoint, 0);
        layers[i].opacity.setValueAtTime(layers[i].inPoint+(fade/fps), 100);
        layers[i].opacity.setValueAtTime(layers[i].outPoint, 0);
        layers[i].opacity.setValueAtTime(layers[i].outPoint-(fade/fps), 100);
    }
    app.endUndoGroup(); // End undo group
}
QuickFades(); // Run the function