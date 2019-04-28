/*
AR_ExportSRT

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ExportSRT
Description-US: Creates subtitles (SRT) file from text layers.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function ExportSRT() {
   var sourceText, t, h, min, sec, ms, starttime, stoptime; // Initialize variables
   var a = 1; // Initialize subtitle id
   var theFile = File.saveDialog("Where to save?", "SRT subtitles:*.srt"); // Prompt where to save srt file
   if (theFile != null) { // If there is file
      theFile.open("w","TEXT","????"); // Open file for writing
      var comp = app.project.activeItem; // Get active composition
      if (comp != null && comp instanceof CompItem) { // If there is active composition
         for (var x = comp.numLayers; x >= 1; x--) { // Loop through compoisition's layers
            if (comp.layer(x) instanceof TextLayer) { // Check if layer is text layer
               function times(n) {
                 if (n < 10) return "0" + n else return "" + n
               }
               function getTime(k) {
                  t = Math.floor(k); // Time
                  h = Math.floor(t/3600); // Hours
                  min = Math.floor((t%3600)/60); // Minutes
                  sec = Math.floor(t%60); // Seconds
                  ms = k.toFixed(3).substr(-3); // Milliseconds
                  return times(h) + ":" + times(min) + ":" + times(sec) + "," + ms; // Return time code
               }
               theFile.writeln(a); // Write subtitle id
               starttime = getTime(comp.layer(x).inPoint); // Get text layer start time
               stoptime = getTime(comp.layer(x).outPoint); // Get text layer end time
               theFile.writeln(starttime+" --> "+stoptime); // Write timecode
               sourceText = comp.layer(x).property("sourceText"); // Get text
               theFile.writeln(sourceText.value); // Write text
               theFile.writeln(""); // Write empty line
               a++; // Increase a by one
            }
         }
      }
      theFile.close(); // Close file
      theFile.execute(); // Open file to default text editor
   }
}
ExportSRT(); // Run the function