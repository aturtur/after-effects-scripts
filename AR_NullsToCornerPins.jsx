/*
AR_NullsToCornerPins

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_NullsToCornerPins
Description-US: Creates a solid layer with CC Power Pin effect and attaches selected null objects to it
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function NullsToCornerPins() {
    app.beginUndoGroup("AR_NullsToCornerPins"); // Begin undo group
    var comp = app.project.activeItem; // Get active items
    var layers = comp.selectedLayers; // Get selected layers
    var names = []; // Initialize list for layer names
    for (var i = 0; i < layers.length; i++) { // Loop through selected layers
            names.push(layers[i].name); // Add layer's name to names list
            layers[i].enabled = false; // Disable layer visibility
    }
    var solid = comp.layers.addSolid([0,0,0], "Corners", comp.width,  comp.height, 1); // Add solid layer to composition
    solid.Effects.addProperty("CC Power Pin"); // Add 'CC Power Pin' effect to solid layer
    comp.layer(1).property("ADBE Effect Parade").property(1).property("Top Left").expression = "L = thisComp.layer(\""+names[0]+"\");\nL.toWorld(L.anchorPoint)"; // Add expression to 'Top Left' property
    comp.layer(1).property("ADBE Effect Parade").property(1).property("Top Right").expression = "L = thisComp.layer(\""+names[1]+"\");\nL.toWorld(L.anchorPoint)"; // Add expression to 'Top Right' property
    comp.layer(1).property("ADBE Effect Parade").property(1).property("Bottom Left").expression = "L = thisComp.layer(\""+names[2]+"\");\nL.toWorld(L.anchorPoint)"; // Add expression to 'Bottom Left' property
    comp.layer(1).property("ADBE Effect Parade").property(1).property("Bottom Right").expression = "L = thisComp.layer(\""+names[3]+"\");\nL.toWorld(L.anchorPoint)"; // Add expression to 'Bottom Right' property
    app.endUndoGroup(); // End undo group
}
NullsToCornerPins(); // Run the function