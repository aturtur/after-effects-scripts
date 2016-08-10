app.beginUndoGroup("Shift layers");

var min = -50;
var max = 50;

var comp = app.project.activeItem;
var s = comp.selectedLayers;
var fps = 1.0 / comp.frameDuration;
var rnd;
var original;

for (var i = 0; i < s.length; i++) {

    original = s[i].startTime;
  
    rnd = Math.random() * (max - min) + min;
    rnd = rnd.toFixed(0);    
    
    s[i].startTime = original+(rnd/fps);
    
}

app.endUndoGroup();