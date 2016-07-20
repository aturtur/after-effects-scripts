app.beginUndoGroup("Masks to shape path holders");

var comp = app.project.activeItem;
var masksLayer = comp.selectedLayers[0];
var shapeLayer = comp.layers.addShape();
var masksGroup = masksLayer.property("ADBE Mask Parade");
var shapeGroup = shapeLayer.property("ADBE Root Vectors Group");
var shapePathGroup, mask, maskPath;

for (var i = 1; i <= masksGroup.numProperties; i++)
{
    mask = masksGroup.property(i);
    maskPath = mask.property("ADBE Mask Shape");
    shapeGroup.addProperty("ADBE Vector Shape - Group").name = mask.name;
}

shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Fill")
shapeLayer.property("ADBE Root Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([1,1,1]);
shapeLayer.name =  "Shape "+masksLayer.name;

app.endUndoGroup();