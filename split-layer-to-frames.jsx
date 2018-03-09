app.beginUndoGroup("split layer to frames");

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];
var frameRate = 1 / comp.frameDuration;
var length = layer.outPoint-layer.inPoint;
var frames =  length*frameRate;
var inFrame = layer.inPoint*frameRate;
var outFrame = layer.outPoint*frameRate;

for (var i = 0; i < frames; i++) {
        var dup = layer.duplicate();
        dup.inPoint = (inFrame+i)/frameRate;
        dup.outPoint = (inFrame+i+1)/frameRate;
}
app.endUndoGroup();