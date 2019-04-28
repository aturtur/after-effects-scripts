/*
AR_AddChromaticAberration

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_AddChromaticAberration
Description-US: Creates Chromatic aberration setup from selected comp item. Selected item should be a pre-comp or a layer that does not have any effects.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function rangeMap(value, minInput, maxInput, minOutput, maxOutput) {
    var remapped = (value - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput
    return remapped
}
function ChromaticAberration() {
    app.beginUndoGroup("AR_AddChromaticAberration"); // Begin undo group
    var comp = app.project.activeItem; // Active composition
    var selectedLayer = comp.selectedLayers[0]; // Selected layer
    var red = selectedLayer;
    var blue = selectedLayer.duplicate(); // Duplicate selected layer
    var green = selectedLayer.duplicate(); // Duplicate selected layer    
    red.name = "Red"; // Name layer to red
    green.name = "Green"; // Name layer to green
    blue.name = "Blue"; // Name layer to blue
    green.blendingMode = BlendingMode.ADD; // Set green layer blending mode to 'Add'
    blue.blendingMode = BlendingMode.ADD; // Set blue layer blending mode to 'Add'
    var rchan = red.Effects.addProperty("Set Channels"); // Add "Set Channels" effect to red layer
    rchan.property("Set Red To Source 1’s").setValue(1); // Set red channel to 'Red'
    rchan.property("Set Green To Source 2’s").setValue(10); // Set green channel to 'Off'
    rchan.property("Set Blue To Source 3’s").setValue(10); // Set blue channel to 'Off'
    var gchan = green.Effects.addProperty("Set Channels"); // Add "Set Channels" effect to green layer
    gchan.property("Set Red To Source 1’s").setValue(10); // Set red channel to 'Off'
    gchan.property("Set Green To Source 2’s").setValue(2); // Set green channel to 'Green'
    gchan.property("Set Blue To Source 3’s").setValue(10); // Set blue channel to 'Off'
    var bchan = blue.Effects.addProperty("Set Channels"); // Add "Set Channels" effect to blue layer
    bchan.property("Set Red To Source 1’s").setValue(10); // Set red channel to 'Off'
    bchan.property("Set Green To Source 2’s").setValue(10); // Set green channel to 'Off'
    bchan.property("Set Blue To Source 3’s").setValue(3); // Set blue channel to 'Blue'
    var baseScale = selectedLayer.property("Transform").property("Scale").value; // Get source layer scale
    blue.property("Transform").property("Scale").setValue([baseScale[0]*0.997,baseScale[1]*0.997]); // Scale blue layer down
    red.property("Transform").property("Scale").setValue([baseScale[0]*1.002,baseScale[1]*1.002]); // Scale blue layer up
    app.endUndoGroup(); // End undo group
}
ChromaticAberration(); // Run the function