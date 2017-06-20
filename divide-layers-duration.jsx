app.beginUndoGroup("divide layers duration");
var comp = app.project.activeItem;
var layer = comp.selectedLayers;
var frameRate = 1 / comp.frameDuration;
var length = layer[0].outPoint-layer[0].inPoint;
for (var i = 0; i < layer.length; i++) {
    if (layer.length > 0) {
        var layers = layer.length;    
        var section = length/layers;        
        layer[i].outPoint = layer[i].inPoint+section;
        layer[i].outPoint = Math.round(layer[i].outPoint*frameRate)/frameRate;
        if (i != 0) {
            layer[i].inPoint = nextOut;
            layer[i].outPoint = layer[i].inPoint+section;
            layer[i].outPoint = Math.round(layer[i].outPoint*frameRate)/frameRate;
        }
        nextOut = layer[i].outPoint;        
    }
}
app.endUndoGroup();