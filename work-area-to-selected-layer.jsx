app.beginUndoGroup("work area to selected layer");
var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];
var layerIn = layer.inPoint;
var layerOut = layer.outPoint;
comp.workAreaStart = layerIn;
comp.workAreaDuration = layerOut-layerIn;
app.endUndoGroup();