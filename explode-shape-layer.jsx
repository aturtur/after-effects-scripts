app.beginUndoGroup("Explode shape layer");

var thisComp = app.project.activeItem;
var theLayer = thisComp.selectedLayers[0];
var shapeContents = theLayer.property("ADBE Root Vectors Group");
var x, y, d;

if (theLayer.selectedProperties.length == 0) {
    // if only layer is selected
    for (var i = 1; i <= shapeContents.numProperties; i++) {         
        theLayer.duplicate();
        theDuplicate = thisComp.layer(theLayer.index - 1);
        theDuplicate.name = theDuplicate.property("ADBE Root Vectors Group").property(i).name;
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
} else if (theLayer.selectedProperties.length > 0) {
    // if properties are selected
    for (var i = 0; i < theLayer.selectedProperties.length; i++) {
        theLayer.duplicate();
        theDuplicate = thisComp.layer(theLayer.index - 1);
        theDuplicate.name = theLayer.selectedProperties[i].name;
        x = 0;
        y = 0;
        d = 0;
        
        for (var h = 1; h < i; h++) {
            if (theDuplicate.property("ADBE Root Vectors Group").property(h - x).name != theLayer.selectedProperties[i].name) {
                theDuplicate.property("ADBE Root Vectors Group").property(h - x).remove();
                x++;
                d++;
            }
        }    
        for (var k = 1; k <= (shapeContents.numProperties - d ); k++) {
            if (theDuplicate.property("ADBE Root Vectors Group").property(k - y).name != theLayer.selectedProperties[i].name) {
                theDuplicate.property("ADBE Root Vectors Group").property(k - y).remove();
                y++;
            }
        }
    }
}
theLayer.enabled = false;
app.endUndoGroup();