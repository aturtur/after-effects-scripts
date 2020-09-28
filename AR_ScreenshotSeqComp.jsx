/*
AR_ScreenshotSeqComp

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ScreenshotSeqComp
Description-US: Takes a screenshot for every frame in the composition. Windows only. Requires NirCmd utility tool installed in your System32 folder.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
Download NirCmd: https://www.nirsoft.net/utils/nircmd.html
*/
//@target aftereffects
var time = 2000; // 
var sleep = 32; //

var x = 0; // Init counter variable
var theFile = File.saveDialog("Where to save?", "PNG image:*.png"); // Prompt where to save screenshots
var fullPath = theFile.fsName;
var splittedPath = fullPath.split("\\");
var fileName = splittedPath.pop().split('.')[0];
var folderPath = splittedPath.join("\\");
var thePath = folderPath+"\\"+fileName+"_";

var task = app.scheduleTask("AR_ScreenshotSeqComp()", time, true); // Create a task

function pad(num, size) { // Zero padding
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function AR_ScreenshotSeqComp() { // Main function
    var comp = app.project.activeItem; // Get active composition
    var workAreaIn = comp.workAreaStart; // Get work area in point
    var workAreaOut = comp.workAreaStart+comp.workAreaDuration; // Get work area out point
    var frame = (comp.frameDuration/1) // Frame in time
    var frameRate = 1 / comp.frameDuration; // Get frame rate
    var framesToCapture = comp.workAreaDuration * frameRate; // Count of frames that should be captured    
    if (x != (framesToCapture)) {
        comp.time = workAreaIn + (frame*x) ; // Set current time 
        x = x+1;
        var frameNumber = pad(x,4);
        system.callSystem("cmd.exe /c nircmd.exe savescreenshot \""+thePath+frameNumber+".png\"");
        $.sleep(sleep); // Sleep, not sure if useful :D
    } else {
        alert("Done");
        app.cancelTask(task); // Kill the task
    }
}