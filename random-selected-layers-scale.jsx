app.beginUndoGroup("random scale");

var comp = app.project.activeItem;
var selection = comp.selectedLayers;
var time = comp.time;
var rnd;

// preferences
var min = 0;
var max = 100;

for (var i = 0; i < selection.length; i++) {

    // randomise
    rnd = Math.floor(Math.random() * ((max-min)+1) + min);
    
    // if there are no keyframes
    if (selection[i].scale.numKeys == 0) {
        selection[i].scale.setValue([rnd,rnd]);
    
    // if there are keyframes
    } else {
        selection[i].scale.setValueAtTime(time,[rnd,rnd]);
    }
}            
app.endUndoGroup();