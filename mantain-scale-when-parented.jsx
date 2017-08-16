app.beginUndoGroup("maintain scale when parented");
var comp = app.project.activeItem;
var layersSelected = comp.selectedLayers;
if (layersSelected != 0) {
    for (var i = 0; i < layersSelected.length; i++) {
        layersSelected[i].scale.expression = "s = []; ps = parent.transform.scale.value; for (i = 0; i < ps.length; i++){ s[i] = value[i]*100/ps[i]; } s";
    }
}
app.endUndoGroup();