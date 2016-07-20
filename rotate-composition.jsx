app.beginUndoGroup("Rotate composition");

var comp = app.project.activeItem;
var layer = app.project.activeItem.selectedLayers[0];

var newWidth = comp.height;
var newHeight = comp.width;

comp.width = newWidth;
comp.height = newHeight;

layer.rotation.setValue(layer.rotation.value+90);

app.endUndoGroup();