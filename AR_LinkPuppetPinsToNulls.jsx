/*
AR_LinkPuppetPinsToNulls

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_LinkPuppetPinsToNulls
Description-US: Connect puppet pins to tracked nulls
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
Warning: Footage layer should be same resolution as the composition!
*/
//@target aftereffects
function PuppetPinsToNulls() {
    app.beginUndoGroup("AR_LinkPuppetPinsToNulls"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var direction = 0; // Initialize selection direction variable

    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
        if (layers[i].nullLayer == false) { // If layer is not null layer
            if (i != 0) { direction = 1 } // Change selection direction
            var theLayer = layers[i]; // Assign footage layer
        }
    }
    var puppet = theLayer.property("ADBE Effect Parade").property("ADBE FreePin3"); // Get puppet effect
    var deform = puppet.property("arap").property("Mesh").property("Mesh 1").property("Deform"); // Get deform property
    for (var p = 0; p < deform.numProperties; p++) { // Loop through properties
        if (direction == 1) { // If selection direction is up to down
            var expression = "thisComp.layer(\""+layers[p].name+"\").transform.position"; // Create expression
            deform.property(p+1).property("Position").expression = expression; // Assign expression
        } else if (direction == 0) { // If selection direction is down to up
            var expression = "thisComp.layer(\""+layers[(layers.length)-p-1].name+"\").transform.position"; // Create expression
            deform.property(p+1).property("Position").expression = expression; // Assign expression
        }
    }
    app.endUndoGroup(); // End undo group
}
PuppetPinsToNulls(); // Run the function