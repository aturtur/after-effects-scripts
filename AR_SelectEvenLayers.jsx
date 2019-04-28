/*
AR_SelectEvenLayers

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_SelectEvenLayers
Description-US: Selects every layer which id number is even.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function SelectEvenLayers() {
    app.beginUndoGroup("AR_SelectEvenLayers"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.layers; // Get layers
    for (var i = 1; i <= layers.length; i++) { // Loop through layers
        if (i % 2 == 0) { // If 'i' is even
            comp.layers[i].selected = true; // Select layer
        }
    }
    app.endUndoGroup(); // End undo group
}
SelectEvenLayers(); // Run the function