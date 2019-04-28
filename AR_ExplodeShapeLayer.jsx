/*
AR_ExplodeShapeLayer

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ExplodeShapeLayer
Description-US: Explodes selected shape layer's shapes to individual layers
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function ExplodeShapeLayer() {
    app.beginUndoGroup("AR_ExplodeShapeLayer"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layer = comp.selectedLayers[0]; // Get selected layer
    var shapeContents = layer.property("ADBE Root Vectors Group"); // Initialize shape layer group property
    var x, y, d; // Initialize variables

    if (layer.selectedProperties.length == 0) { // If there is no selected properties; Explode all
        for (var i = 1; i <= shapeContents.numProperties; i++) { // Loop through shape properties
            layer.duplicate();
            duplicate = comp.layer(layer.index - 1);
            duplicate.name = duplicate.property("ADBE Root Vectors Group").property(i).name;
            x = 0; y = 0; d = 0;
            for (var h = 1; h < i; h++) {
                duplicate.property("ADBE Root Vectors Group").property(h - x).remove();
                x++; d++;
            }    
            for (var k = 2; k <= (shapeContents.numProperties - d ); k++) {
                duplicate.property("ADBE Root Vectors Group").property(k - y).remove();
                y++;
            }
        }
    } else if (layer.selectedProperties.length > 0) { // If there is selected properties
        for (var i = 0; i < layer.selectedProperties.length; i++) {
            layer.duplicate();
            duplicate = comp.layer(layer.index - 1);
            duplicate.name = layer.selectedProperties[i].name; // Set layer name to current property name
            x = 0; y = 0; d = 0;            
            for (var h = 1; h < i; h++) {
                if (duplicate.property("ADBE Root Vectors Group").property(h - x).name != layer.selectedProperties[i].name) {
                    duplicate.property("ADBE Root Vectors Group").property(h - x).remove();
                    x++; d++;
                }
            }    
            for (var k = 1; k <= (shapeContents.numProperties - d ); k++) {
                if (duplicate.property("ADBE Root Vectors Group").property(k - y).name != layer.selectedProperties[i].name) {
                    duplicate.property("ADBE Root Vectors Group").property(k - y).remove();
                    y++;
                }
            }
        }
    }
    layer.enabled = false; // Disable layer
    app.endUndoGroup(); // End undo group
}
ExplodeShapeLayer(); // Run the function