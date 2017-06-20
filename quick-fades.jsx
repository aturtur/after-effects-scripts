app.beginUndoGroup("quick fades");

var fade = prompt("Fade duration in frames");
var comp = app.project.activeItem;
var layer = comp.selectedLayers;
var fps = 1 / comp.frameDuration;
for (var i = 0; i < layer.length; i++) {
    layer[i].opacity.setValueAtTime(layer[i].inPoint, 0);
    layer[i].opacity.setValueAtTime(layer[i].inPoint+(fade/fps), 100);
    layer[i].opacity.setValueAtTime(layer[i].outPoint, 0);
    layer[i].opacity.setValueAtTime(layer[i].outPoint-(fade/fps), 100);
}
app.endUndoGroup();