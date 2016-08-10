app.beginUndoGroup("Randomise selected layers scale");

var comp = app.project.activeItem;
var selection = comp.selectedLayers;
var min = 50;
var max = 100;
var rnd;

for (var i = 0; i < selection.length; i++) {
    rnd = Math.random() * (max - min) + min;
    selection[i].scale.setValue([rnd,rnd]);
}

app.endUndoGroup();