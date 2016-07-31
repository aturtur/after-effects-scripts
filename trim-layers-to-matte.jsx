app.beginUndoGroup("Trim layers to Matte");

var comp = app.project.activeItem;
var layer = comp.selectedLayers;
var matteLayer;

for (var i = 0; i < layer.length; i++) {
    if (layer[i].hasTrackMatte) {
        matteLayer = comp.layer(layer[i].index - 1);
        layer[i].inPoint = matteLayer.inPoint;
        layer[i].outPoint = matteLayer.outPoint;
    }
}
app.endUndoGroup();