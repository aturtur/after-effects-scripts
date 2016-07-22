app.beginUndoGroup("Parent above");

var comp = app.project.activeItem;

for (var i = 0; i < comp.selectedLayers.length; i++){
	curLayer = comp.selectedLayers[i];
	curLayer.parent = comp.layer(curLayer.index-1);
}

app.endUndoGroup();