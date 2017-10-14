app.beginUndoGroup("import-fusion-data");
function frame(timeInString) {
    var t = timeInString.split(":");
    var s = parseInt(t)*3600+parseInt(t[1])*60+parseFloat(t[2].replace(",","."));
    return s;
}

function dfmo() {
    var comp = app.project.activeItem;
    var frameRate = 1 / comp.frameDuration;
    if (comp instanceof CompItem){
        var dfmo = File.openDialog("Select a DFMO file to open.", "DFMO file:*.dfmo");
        if (dfmo != null) {
            dfmo.open("r");
            var theNull = comp.layers.addNull(comp.duration);
            while (!dfmo.eof) {
                var line = dfmo.readln();
                while (line == "") {
                    line = dfmo.readln();
                }
                line = dfmo.readln();
                var times = line.split(" ");
                var x = times[0];
                var y = times[1];
                var f = parseInt(times[2]);

                theNull.position.setValueAtTime(f/frameRate , [x*comp.width, comp.height-(y*comp.width)]);
            }
            dfmo.close();
        }
    } else {
        alert("Make a comp first.");
    }
}
dfmo();
app.endUndoGroup();