app.beginUndoGroup("Parent selected top half");

var comp = app.project.activeItem;
var layers = comp.selectedLayers.length;
var split = layers / 2;

for (var i = 0; i < layers; i++) {

	if (i < (split)) {
        curLayer = comp.selectedLayers[i];
        curLayer.parent = comp.layer(curLayer.index+split);
    }
}
app.endUndoGroup();