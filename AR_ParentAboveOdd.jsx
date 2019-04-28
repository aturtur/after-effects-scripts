/*
AR_ParentAboveOdd

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ParentAboveOdd
Description-US: When you have a big selection, this script sets every odd layer to parent of below layer. You must have at least two selected layers.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
function ParentAbove() {
    app.beginUndoGroup("ParentAboveOdd"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers // Get selected layers
    var k; // Initialize varaible
        for (var i = 0; i < layers.length; i++){ // Loop through selected layers
            if (k % 2 == 0) { // If 'k' is odd number
                layers[i].parent = comp.layer(layers[i].index-1); // Parent to above
                k = i; // Set 'k' to 'i'
            } else { k = i; } // If 'k' is even number; set 'k' to 'i'
        }
    app.endUndoGroup(); // End undo group
}
ParentAbove(); // Run the script