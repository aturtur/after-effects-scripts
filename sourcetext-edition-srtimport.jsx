app.beginUndoGroup("srt-import");
function getframe(timeInString) {
    var t = timeInString.split(":");
    var timeS = parseInt(t)*3600+parseInt(t[1])*60+parseFloat(t[2].replace(",","."));
    var frame = timeS*frameRate;
    return timeS;
}
function makeSubs() {
    var comp = app.project.activeItem;
    if (comp instanceof CompItem) {
        var layer = comp.layers.addText("SRT");
        var srt = File.openDialog("Select a text file to open.", "SRT subtitles:*.srt");
        if (srt != null) {
            srt.open("r");
            var sourceText = layer.property("sourceText");
            sourceText.setValueAtTime(0,"");
            while (!srt.eof) {
                line = srt.readln();
                while (line == "") {
                    line = srt.readln();
                }
                    line = srt.readln();
                var times=line.split("-->");
                var starttime = getframe(times[0]);
                var stoptime = getframe(times[1]);
                var text = "";
                while ((line = srt.readln()) != "") {
                    text += line.replace(/<(.*?)>/g, "")+"\r\n";
                }
                sourceText.setValueAtTime(starttime,text);
                sourceText.setValueAtTime(stoptime,"");
            }
            srt.close();
            var keys = layer.property("sourceText").numKeys;
            var lastKeyTime = layer.property("sourceText").keyTime(keys);
            layer.outPoint = lastKeyTime;
        }
    } else {
        alert("Make a comp and keep it selected.");
    }    
}
var  line = "";
var comp = app.project.activeItem;
var frameRate = 1 / comp.frameDuration;
makeSubs();
app.endUndoGroup();