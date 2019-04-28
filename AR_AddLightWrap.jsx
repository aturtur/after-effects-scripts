/*
AR_AddLightWrap

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_AddLightWrap
Description-US: Creates light wrap from selected foreground and background layers.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function AddLightWrap() {
    app.beginUndoGroup("AR_AddLightWrap"); // Begin undo group
    var comp = app.project.activeItem; // Active composition
    var selectedLayers = comp.selectedLayers; // Collect selected layers
    var foreground; // Initialize variable
    var background; // Initialize variable
    // Compare which layer has a bigger index number and assign layers accordingly
    if (selectedLayers[0].index < selectedLayers[1].index) {
        foreground = selectedLayers[0]; background = selectedLayers[1];
    } else {
        foreground = selectedLayers[1]; background = selectedLayers[0];
    }
    var lightwrap = background.duplicate(); // Duplicate background layer
    lightwrap.moveBefore(foreground); // Move lightwrap layer top of foreground layer
    // Fast box blur a (Blur background)
    var fbba = lightwrap.Effects.addProperty("Fast Box Blur"); // Add "Fast Box Blur" effect
    fbba.name = "Blur Background" // Change effect name
    fbba.property("Blur Radius").setValue(5); // Set "Blur Radius" to 5
    fbba.property("Iterations").setValue(1); // Set "Iterations" to 1
    fbba.property("Repeat Edge Pixels").setValue(1); // Enable "Repeat Edge Pixels"
    // Set matte a
    var sma = lightwrap.Effects.addProperty("Set Matte"); // Add "Set Matte" effect
    sma.property("Take Matte From Layer").setValue(foreground.index); // Set "Take Matte From Layer" to foreground
    sma.property("Invert Matte").setValue(1); // Enable "Invert Matte"
    // Channel blur (Change light wrap size)
    var cb = lightwrap.Effects.addProperty("Channel Blur"); // Add "Channel Blur" effect to matte layer
    cb.name = "Light Wrap Size" // Change effect name
    cb.property("Alpha Blurriness").setValue("5"); // Set "Alpha Blurriness" to 5
    cb.property("Edge Behavior").setValue(1) // Enable "Repeat Edge Pixels"
    // Set matte b 
    var smb = lightwrap.Effects.addProperty("Set Matte"); // Add second "Set Matte" effect
    smb.property("Take Matte From Layer").setValue(foreground.index); // Set "Take Matte From Layer" to foreground
    // Brightness & Contrast (Set light wrap brightness)
    var bc = lightwrap.Effects.addProperty("Brightness & Contrast"); // Add "Brightness & Contrast" effect
    bc.name = "Background brightness" // Change effect name
    // Fast box blur b (Blur whole light wrap)
    var fbbb = lightwrap.Effects.addProperty("Fast Box Blur"); // Add second "Fast Box Blur" effect
    fbbb.name = "Blur Whole Light Wrap" // Change effect name
    fbbb.property("Blur Radius").setValue(0); // Set "Blu Radius" to zero
    fbbb.property("Iterations").setValue(1); // Set "Iterations" to 1
    fbbb.property("Repeat Edge Pixels").setValue(0); // Enable "Repeat Edge Pixels"
    // Tint (Change light wrap tint)
    var tint = lightwrap.Effects.addProperty("Tint"); // Add "Tint" effect
    tint.name = "Tint Light Wrap" // Change effect name
    tint.property("Amount to Tint").setValue(0); // Set "Amount to Tint" to zero
    // Ligh wrap layer settings
    lightwrap.name = "Light Wrap"; // Change layer name
    lightwrap.blendingMode = BlendingMode.SCREEN; // Set layer blending mode
    lightwrap.opacity.setValue(50); // Change layer opacity
    app.endUndoGroup(); // End undo group
}
AddLightWrap(); // Run the function
