/*
AR_SelectOddLayers

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_SelectOddLayers
Description-US: Selects every layer which id number is odd.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function SelectOddLayers() {
    app.beginUndoGroup("AR_SelectOddLayers"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.layers; // Get layers
    for (var i = 1; i <= layers.length; i++) { // Loop through layers
        if (i % 2 == 1) { // If 'i' is odd
            comp.layers[i].selected = true; // Select layer
        }
    }
    app.endUndoGroup(); // End undo group
}
SelectOddLayers(); // Run the script