app.beginUndoGroup("nulls-to-corner-pins");
var comp = app.project.activeItem;
var layers = comp.selectedLayers.length;
var names = [];

for (var i = 0; i < layers; i++) {
        names.push(comp.selectedLayers[i].name);
        comp.selectedLayers[i].enabled = false;
}

var solid = comp.layers.addSolid([0,0,0], "Corners", comp.width,  comp.height, 1);
solid.Effects.addProperty("CC Power Pin");
comp.layer(1).property("ADBE Effect Parade").property(1).property("Top Left").expression = "thisComp.layer(\""+names[0]+"\").transform.position";
comp.layer(1).property("ADBE Effect Parade").property(1).property("Top Right").expression = "thisComp.layer(\""+names[1]+"\").transform.position";
comp.layer(1).property("ADBE Effect Parade").property(1).property("Bottom Left").expression = "thisComp.layer(\""+names[2]+"\").transform.position";
comp.layer(1).property("ADBE Effect Parade").property(1).property("Bottom Right").expression = "thisComp.layer(\""+names[3]+"\").transform.position";
app.endUndoGroup();