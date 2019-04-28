/*
AR_AddEdgeBlur

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_AddEdgeBlur
Description-US: Creates edge blur composition from selected layer. Layer must have an alpha channel.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function AddEdgeBlur() {
    app.beginUndoGroup("AR_AddEdgeBlur"); // Begin undo group
    var comp = app.project.activeItem; // Active composition
    var selectedLayer = comp.selectedLayers[0]; // Selected layer
    var precomp = comp.layers.precompose([selectedLayer.index], "Edge Blur", true); // Create a pre-composition
    var blurLayer = precomp.layers.addSolid([0, 0, 0], "Edge Blur", comp.width, comp.height, comp.pixelAspect, comp.duration); // Add a solid to pre-composition
    var matteLayer = precomp.layers.addSolid([0, 0, 0], "Matte", comp.width, comp.height, comp.pixelAspect, comp.duration); // Add a solid to pre-composition

    // Blur layer settings
    blurLayer.adjustmentLayer = true; // Change solid to an adjustment layer
    blurLayer.trackMatteType = TrackMatteType.ALPHA; // Change track matte to alpha
    var fbba = blurLayer.Effects.addProperty("Fast Box Blur"); // Add "Fast Box Blur" effect to blur layer
    fbba.property("Blur Radius").setValue(1); // Set "Blur Radius" to 1
    fbba.property("Repeat Edge Pixels").setValue(1); // Enable "Repeat Edge Pixels"
    
    // Matte layer settings
    var sm = matteLayer.Effects.addProperty("Set Matte"); // Add "Set Matte" effect to matte layer
    sm.property("Take Matte From Layer").setValue(3); // Set "Take Matte From Layer" to source
    sm.property("Invert Matte").setValue(1); // Enable "Invert Matte"
    var cb = matteLayer.Effects.addProperty("Channel Blur"); // Add "Channel Blur" effect to matte layer
    cb.property("Edge Behavior").setValue(1) // Enable "Repeat Edge Pixels"
    var sc = matteLayer.Effects.addProperty("Simple Choker"); // Add "Simple Choker" effect to matte layer
    sc.property("Choke Matte").setValue(-0.5) // Set "Choke Matte" to -0.5
    var fbbb = matteLayer.Effects.addProperty("Fast Box Blur"); // Add "Fast Box Blur" effect to matte layer
    fbbb.property("Blur Radius").setValue(1); // Set "Blur Radius" to 1
    fbbb.property("Repeat Edge Pixels").setValue(1); // Enable "Repeat Edge Pixels"
    app.endUndoGroup(); // End undo group
}
AddEdgeBlur(); // Run the function