app.beginUndoGroup("select even layers");
var comp = app.project.activeItem;
var layers = comp.layers;

for (var i = 1; i <= layers.length; i++) {
    if (i % 2 == 0) {
        comp.layers[i].selected = true;
    }
}
app.endUndoGroup();