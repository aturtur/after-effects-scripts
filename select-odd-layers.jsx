app.beginUndoGroup("select odd layers");
var comp = app.project.activeItem;
var layers = comp.layers;

for (var i = 1; i <= layers.length; i++) {
    if (i % 2 == 1) {
        comp.layers[i].selected = true;
    }
}
app.endUndoGroup();