app.beginUndoGroup("srt-import");
function frame(timeInString) {
    var t = timeInString.split(":");
    var s = parseInt(t)*3600+parseInt(t[1])*60+parseFloat(t[2].replace(",","."));
    return s;
}
function subs() {
    var comp = app.project.activeItem;
    if (comp instanceof CompItem){
        var srt = File.openDialog("Select a text file to open.", "SRT subtitles:*.srt");
        if (srt != null) {
            srt.open("r");                
            while (!srt.eof) {
                var layer = comp.layers.addText("SRT");
                var sourceText = layer.property("sourceText");
                var line = srt.readln();
                while (line == "") {
                    line = srt.readln();
                }
                    line = srt.readln();
                var times = line.split("-->");
                var f = frame(times[0]);
                var l = frame(times[1]);
                var text = "";
                while ((line = srt.readln()) != "") {
                    text += line.replace(/<(.*?)>/g, "")+"\r\n";
                }
                sourceText.setValue(text);
                layer.inPoint = f;
                layer.outPoint = l;
            }
            srt.close();
        }
    } else {
        alert("Make a comp first.");
    }    
}
subs();
app.endUndoGroup();