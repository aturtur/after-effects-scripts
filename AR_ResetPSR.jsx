/*
AR_ResetPSR

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ResetPSR
Description-US: Resets selected layers position, scale and rotation
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects 
function ResetPSR() {
    app.beginUndoGroup("AR_ResetPSR"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var horizontalPosition, verticalPosition; // Initialize variables
    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
        if (layers[i].parent != null) { // If layer is parented
            horizontalPosition = layers[i].parent.width/2; // Get composition center width
            verticalPosition = layers[i].parent.height/2; // Get composition center height
            if (layers[i].parent.nullLayer == true) { // If layer is parented to null)
                horizontalPosition = 0;
                verticalPosition = 0;
            }
        } else {
            horizontalPosition = comp.width/2; // Set horizontal position to composition center width
            verticalPosition = comp.height/2; // Set vertical position to composition center height
        }
            if (!layers[i].threeDlayers) { // If layer is 2D layer
                layers[i].position.setValue([horizontalPosition,verticalPosition]);
                layers[i].scale.setValue([100,100]);
                layers[i].rotation.setValue(0); // Set rotation to '0'
            } else if (layers[i].threeDlayer) { // If layer is 3D layer
                layers[i].position.setValue([horizontalPosition,verticalPosition,0]);
                layers[i].scale.setValue([100,100,100]);
                layers[i].rotation.setValue(0); // Set rotation to '0'
                layers[i].property("Transform").property("Orientation").setValue([0,0,0]); // Zero orientation
                layers[i].property("Transform").property("X Rotation").setValue(0); // Zero x rotation
                layers[i].property("Transform").property("Y Rotation").setValue(0); // Zero y rotation
                layers[i].property("Transform").property("Z Rotation").setValue(0); // Zero z rotation
            }
    }
    app.endUndoGroup(); // End undo group
}
ResetPSR(); // Run the function