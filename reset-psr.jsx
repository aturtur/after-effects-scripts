app.beginUndoGroup("reset PSR");
var comp = app.project.activeItem;
var layer = comp.selectedLayers;
var width = comp.width/2;
var height = comp.height/2;

for (var i = 0; i < layer.length; i++) {
    
    // check if parented
    if (layer[i].parent != null) {
        // parented 2d layer
        if (!layer[i].threeDLayer) {
            layer[i].position.setValue([0,0]);
            layer[i].scale.setValue([100,100]);
            layer[i].rotation.setValue(0);

        // parented 3d layer
        } else if (layer[i].threeDLayer) {
            layer[i].position.setValue([0,0,0]);
            layer[i].scale.setValue([100,100,100]);
            layer[i].rotation.setValue(0);
            layer[i].property("Transform").property("Orientation").setValue([0,0,0]);
            layer[i].property("Transform").property("X Rotation").setValue(0);
            layer[i].property("Transform").property("Y Rotation").setValue(0);
            layer[i].property("Transform").property("Z Rotation").setValue(0);
        }
    } else {
        // 2d layer
        if (!layer[i].threeDLayer) {
            layer[i].position.setValue([width,height]);
            layer[i].scale.setValue([100,100]);
            layer[i].rotation.setValue(0);

        // 3d layer
        } else if (layer[i].threeDLayer) {
            layer[i].position.setValue([width,height,0]);
            layer[i].scale.setValue([100,100,100]);
            layer[i].rotation.setValue(0);
            layer[i].property("Transform").property("Orientation").setValue([0,0,0]);
            layer[i].property("Transform").property("X Rotation").setValue(0);
            layer[i].property("Transform").property("Y Rotation").setValue(0);
            layer[i].property("Transform").property("Z Rotation").setValue(0);
        }
    }
}
app.endUndoGroup();