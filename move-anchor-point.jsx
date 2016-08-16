app.beginUndoGroup("move anchor point");

var n = 1; // target
var comp = app.project.activeItem;
var currentTime = app.project.activeItem.time;

for (var i = 0; i < comp.selectedLayers.length; i++) {
    var layer = comp.selectedLayers[i];
    var duplicateLayer = layer.duplicate();

    duplicateLayer.scale.setValue([100,100]);
    var oldParent = layer.parent;
    layer.parent = duplicateLayer;

    // get the data
    var boxWidth = (layer.sourceRectAtTime(currentTime, false).width);
    var boxHeight = (layer.sourceRectAtTime(currentTime, false).height);
    var cAnchorX = layer.anchorPoint.value[0];
    var cAnchorY = layer.anchorPoint.value[1];
    var cPosX = layer.position.value[0];
    var cPosY = layer.position.value[1];
    var cPosZ = layer.position.value[2];
    var scaleX = layer.scale.value[0]/100;
    var scaleY = layer.scale.value[1]/100;

    switch(n) {
        // [Left, Top]
        case 1:
            var x = 0;
            var y = 0;
            break;
        // [Left, Middle]
        case 2:
            var x = 0;
            var y = boxHeight/2;
            break;
        // [Left, Bottom]
        case 3:
            var x = 0;
            var y = boxHeight;
            break;
        // [Middle, Top]    
        case 4:
            var x = boxWidth/2;
            var y = 0;
            break;
        // [Middle, Middle]
        case 5:
            var x = boxWidth/2;
            var y = boxWidth/2;
            break;
        // [Middle, Bottom]
        case 6:
            var x = boxWidth/2;
            var y = boxWidth;
            break;
        // [Right, Top]
        case 7:
            var x = boxWidth;
            var y = 0;
            break;
        // [Right, Middle]
        case 8:
            var x = boxWidth;
            var y = 0;
            break;
        // [Right, Bottom]
        case 9:
            var x = boxWidth;
            var y = boxHeight;
            break;
    }

    if (layer instanceof ShapeLayer || layer instanceof TextLayer) {
      x += layer.sourceRectAtTime(currentTime, false).left;
      y += layer.sourceRectAtTime(currentTime, false).top;
    }

    var moveX = (x - cAnchorX) * scaleX;
    var moveY = (y - cAnchorY) * scaleY;

    // set data
    layer.anchorPoint.setValue([x, y]);
    layer.position.setValue([cPosX+moveX, cPosY+moveY, cPosZ]);

    // remove duplicate
    duplicateLayer.remove();

    // put old parent back
    layer.parent = oldParent;
}
app.endUndoGroup();