app.beginUndoGroup("sequence layers");

var comp = app.project.activeItem;
var layersSelected = comp.selectedLayers;
var layers = comp.layers.length;

var prevStart = layersSelected[0].startTime;
var prevIn = layersSelected[0].inPoint;
var prevOut = layersSelected[0].outPoint;

var sub;

for (var i = 1; i < layersSelected.length; i++) {
    
    sub = layersSelected[i].inPoint - layersSelected[i].startTime;
    layersSelected[i].startTime = prevOut - sub;

    prevStart = layersSelected[i].startTime;
    prevIn = layersSelected[i].inPoint;
    prevOut = layersSelected[i].outPoint;
    
}
app.endUndoGroup();
