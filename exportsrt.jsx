var sourceText, t, h, min, sec, ms, starttime, stoptime;
var a = 1;
var theFile = File.saveDialog("Where to save?", "SRT subtitles:*.srt");
if (theFile != null) {
   theFile.open("w","TEXT","????");
   activeItem = app.project.activeItem;
   if (activeItem != null && activeItem instanceof CompItem) {
      for (var x = activeItem.numLayers; x >= 1; x--) {
         if (activeItem.layer(x) instanceof TextLayer) {
            function times(n) {
              if (n < 10) return "0" + n else return "" + n
            }
            function getTime(k) {
               t = Math.floor(k);
               h = Math.floor(t/3600);
               min = Math.floor((t%3600)/60);
               sec = Math.floor(t%60);
               ms = k.toFixed(3).substr(-3);
               return times(h) + ":" + times(min) + ":" + times(sec) + "," + ms;
            }
            theFile.writeln(a);
            starttime = getTime(activeItem.layer(x).inPoint);
            stoptime = getTime(activeItem.layer(x).outPoint);
            theFile.writeln(starttime+" --> "+stoptime);
            sourceText = activeItem.layer(x).property("sourceText");
            theFile.writeln(sourceText.value);
            theFile.writeln("");
            a++;
         }
      }
   }
   theFile.close();
   theFile.execute();
}