/*
AR_ImportSRT

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ImportSRT
Description-US: Imports subtitles (SRT) file and creates text layers.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function frame(timeInString) {
    var t = timeInString.split(":");
    var s = parseInt(t)*3600+parseInt(t[1])*60+parseFloat(t[2].replace(",","."));
    return s;
}
function ImportSRT() {
    app.beginUndoGroup("AR_ImportSRT"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    if (comp instanceof CompItem){ // Check that there really is composition
        var srt = File.openDialog("Select a text file to open.", "SRT subtitles:*.srt"); // Prompt to load srt file
        if (srt != null) { // Check that there is file
            srt.open("r"); // Open file for reading
            while (!srt.eof) { // Go through subtitle file's lines
                var layer = comp.layers.addText("SRT"); // Add text layer
                var sourceText = layer.property("sourceText"); // Get property
                var line = srt.readln(); // Read line from the file
                while (line == "") { // Skip empty lines
                    line = srt.readln();
                }
                    line = srt.readln();
                var times = line.split("-->"); // Get timecode
                var f = frame(times[0]); // Get in time
                var l = frame(times[1]); // Get out time
                var text = ""; // Initialize text string
                while ((line = srt.readln()) != "") { // Handle text
                    text += line.replace(/<(.*?)>/g, "")+"\r\n";
                }
                sourceText.setValue(text); // Set text
                layer.inPoint = f; // Set layer in point
                layer.outPoint = l; // Set layer out point
            }
            srt.close(); // Close file
        }
    } else { // If something went wrong
        alert("Make a comp first."); // Alert user
    }    
    app.endUndoGroup(); // End undo group
}
ImportSRT(); // Run import subtitles function