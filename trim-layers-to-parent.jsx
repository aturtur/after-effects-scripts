app.beginUndoGroup("trim layers to Parent");

var comp = app.project.activeItem;
var layer = comp.selectedLayers;
var parentLayer;

for (var i = 0; i < layer.length; i++) {
    if (layer[i].parent != null) {
        parentLayer = comp.layer(layer[i].parent.index);
        layer[i].inPoint = parentLayer.inPoint;
        layer[i].outPoint = parentLayer.outPoint;
    }
}
app.endUndoGroup();