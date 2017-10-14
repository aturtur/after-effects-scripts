app.beginUndoGroup("import-fusion-polygon-point-data");
var comp = app.project.activeItem;
var frameRate = 1 / comp.frameDuration; 
 
var targetFolder = Folder.selectDialog("Import DFMO Folder");

if (targetFolder) {
    var files = targetFolder.getFiles();
        for (var i = 0; i < files.length; i++) {
            if (files[i].toString().split('.').pop() == "dfmo") {
                try {
                    files[i].open("r");
                    var theNull = comp.layers.addNull(comp.duration);                
                    while (!files[i].eof) {
                        var line = files[i].readln();
                        while (line == "") {
                            line = files[i].readln();
                        }
                        line = files[i].readln();
                        var times = line.split(" ");
                        var x = times[0];
                        var y = times[1];
                        var f = parseInt(times[2]);

                        theNull.position.setValueAtTime(f/frameRate , [x*comp.width, comp.height-(y*comp.width)]);
                        files[i].close();
                    }
                } catch (error) {}
            }
      }
}
app.endUndoGroup();