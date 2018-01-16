app.beginUndoGroup("create parented nulls");
var comp = app.project.activeItem;
var frameRate = 1 / comp.frameDuration; 
var layers = comp.selectedLayers;

for (var i = 0; i < layers.length; i++) {
    var theNull = comp.layers.addNull(comp.duration);
    theNull.parent = layers[i];

    // parented 2d layer
    if (!layers[i].threeDLayer) {
        theNull.position.setValue([0,0]);
        theNull.scale.setValue([100,100]);
        theNull.rotation.setValue(0);

    // parented 3d layer
    } else if (layers[i].threeDLayer) {
        theNull.position.setValue([0,0,0]);
        theNull.scale.setValue([100,100,100]);
        theNull.rotation.setValue(0);
        theNull.property("Transform").property("Orientation").setValue([0,0,0]);
        theNull.property("Transform").property("X Rotation").setValue(0);
        theNull.property("Transform").property("Y Rotation").setValue(0);
        theNull.property("Transform").property("Z Rotation").setValue(0);
    }
}
app.endUndoGroup();