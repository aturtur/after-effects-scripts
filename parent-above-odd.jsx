app.beginUndoGroup("Parent above odd");

var comp = app.project.activeItem;
var k = 1;
for (var i = 0; i < comp.selectedLayers.length; i++) {
	if (k%2==0) {
        curLayer = comp.selectedLayers[i];
        curLayer.parent = comp.layer(curLayer.index-1);
        k = i;
	} else {
        k = i;
	}
}
app.endUndoGroup();			