app.beginUndoGroup("Randomise selected layers rotation");

var comp = app.project.activeItem;
var selection = comp.selectedLayers;
var min = 0;
var max = 5;
var rnd;

for (var i = 0; i < selection.length; i++) {
    rnd = Math.random() * (max - min) + min;
    selection[i].rotation.setValue(rnd);
}

app.endUndoGroup();