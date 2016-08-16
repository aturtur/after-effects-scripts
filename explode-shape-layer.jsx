app.beginUndoGroup("explode shape layer");

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];
var shapeContents = layer.property("ADBE Root Vectors Group");
var x, y, d;

for (var i = 1; i <= shapeContents.numProperties; i++) { 
    
        layer.duplicate();
        theDuplicate = comp.layer(layer.index - 1);
        theDuplicate.name = theDuplicate.property("ADBE Root Vectors Group").property(i).name;
        theDuplicate.label = layer.label;
        theDuplicate.enables = true;
        x = 0;
        y = 0;
        d = 0;
        
        for (var h = 1; h < i; h++) {
            theDuplicate.property("ADBE Root Vectors Group").property(h - x).remove();
            x++;
            d++;
        }
    
        for (var k = 2; k <= (shapeContents.numProperties - d ); k++) {
            theDuplicate.property("ADBE Root Vectors Group").property(k - y).remove();
            y++;
        }
}
layer.enabled = false;
app.endUndoGroup();