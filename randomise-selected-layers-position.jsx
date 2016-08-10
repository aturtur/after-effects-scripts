app.beginUndoGroup("Randomise selected layers position");

var comp = app.project.activeItem;
var selection = comp.selectedLayers;

var xMin = 0;
var xMax = comp.width;
var yMin = 0;
var yMax = comp.height;

var rnd;

for (var i = 0; i < selection.length; i++) {
    xRnd = Math.random() * (xMax - xMin) + xMin;
    yRnd = Math.random() * (yMax - yMin) + yMin;
    selection[i].position.setValue([xRnd,yRnd]);
}