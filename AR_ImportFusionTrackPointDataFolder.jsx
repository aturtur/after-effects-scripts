/*
AR_ImportFusionTrackPointDataFolder

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ImportFusionTrackPointDataFolder
Description-US: Imports folder and creates animated null object(s) to current composition from dfmo-files.
Warning: Your composition have to be same size as source's resolution in Fusion!

Tracker#Tracker#Polyline# > Export:
    Export Polygon (Dialog):
        > Format: Motion Path
        > Export Points: Point Samples
        > PointValues: Absolute

Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function ImportFusionTrackPointDataFolder() {
    app.beginUndoGroup("AR_ImportFusionTrackPointDataFolder");
    var comp = app.project.activeItem; // Get active composition
    var frameRate = 1 / comp.frameDuration; // Get frame rate
    var folder = Folder.selectDialog("Import DFMO Folder"); // Get folder
    if (folder) { // If there is folder
        var files = folder.getFiles(); // Get files from folder
            for (var i = 0; i < files.length; i++) { // Iterate through files
                if (files[i].toString().split('.').pop() == "dfmo") { // If extension is dfmo
                    try { // Try to execute following script
                        files[i].open("r"); // Open file for reading purpose
                        var n = comp.layers.addNull(comp.duration); // Create null object
                        while (!files[i].eof) { // While there is content in file
                            var line = files[i].readln(); // Read line
                            while (line == "") { line = files[i].readln(); } // Skip empty lines
                            line = files[i].readln(); // Read line
                            var times = line.split(" "); // Split line to list
                            var x = times[0]; // Get x-position
                            var y = times[1]; // Get y-position
                            var f = parseInt(times[2]); // Get frame number
                            n.position.setValueAtTime(f/frameRate , [x*comp.width, comp.height-(y*comp.width)]); // Animate null
                        }
                    } catch (rror) {} // If something went wrong, do nothing
                }
            files[i].close(); // Close file
          }
    }
    app.endUndoGroup(); // End undo group
}
ImportFusionTrackPointDataFolder(); // Omg what a function name xD