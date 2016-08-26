app.beginUndoGroup("random position");

var comp = app.project.activeItem;
var selection = comp.selectedLayers;
var time = comp.time;
var rnd;

// preferences
var xMin = 0;
var xMax = comp.width;
var yMin = 0;
var yMax = comp.height;

for (var i = 0; i < selection.length; i++) {

    // randomise
    xRnd = Math.floor(Math.random() * ((xMax-xMin)+1) + xMin);
    yRnd = Math.floor(Math.random() * ((yMax-yMin)+1) + yMin);

    // if there are no keyframes
    if (selection[i].position.numKeys == 0) {
        selection[i].position.setValue([xRnd,yRnd]);

    // if there are keyframes
    } else {
        selection[i].position.setValueAtTime(time,[xRnd,yRnd]);
    }
}            
app.endUndoGroup();