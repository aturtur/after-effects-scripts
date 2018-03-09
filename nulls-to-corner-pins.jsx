app.beginUndoGroup("nulls to corner pins");
var comp = app.project.activeItem;
var layers = comp.selectedLayers.length;
var names = [];
for (var i = 0; i < layers; i++) {
        names.push(comp.selectedLayers[i].name);
        comp.selectedLayers[i].enabled = false;
}
var solid = comp.layers.addSolid([0,0,0], "Corners", comp.width,  comp.height, 1);
solid.Effects.addProperty("CC Power Pin");
comp.layer(1).property("ADBE Effect Parade").property(1).property("Top Left").expression = "L = thisComp.layer(\""+names[0]+"\");\nL.toWorld(L.anchorPoint)";
comp.layer(1).property("ADBE Effect Parade").property(1).property("Top Right").expression = "L = thisComp.layer(\""+names[1]+"\");\nL.toWorld(L.anchorPoint)";
comp.layer(1).property("ADBE Effect Parade").property(1).property("Bottom Left").expression = "L = thisComp.layer(\""+names[2]+"\");\nL.toWorld(L.anchorPoint)";
comp.layer(1).property("ADBE Effect Parade").property(1).property("Bottom Right").expression = "L = thisComp.layer(\""+names[3]+"\");\nL.toWorld(L.anchorPoint)";
app.endUndoGroup();