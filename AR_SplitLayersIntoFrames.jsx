/*
AR_SplitLayersIntoFrames

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_SplitLayersIntoFrames
Description-US: Splits selected layer into frames.
Written for Adobe After Effects CC 2019 (Version 16.1.0 Build 208)
*/
//@target aftereffects
function SplitLayerIntoFrames() {
    app.beginUndoGroup("AR_SplitLayerIntoFrames"); // Add undo group
    var comp = app.project.activeItem; // Get active composition
    var layer = comp.selectedLayers[0]; // Get selected layer
    var frameRate = 1 / comp.frameDuration; // Get frame rate
    var duration = layer.outPoint-layer.inPoint; // Get layer duration
    var frames =  duration*frameRate; // Get frame count
    var inFrame = layer.inPoint*frameRate; // Get in frame
    var outFrame = layer.outPoint*frameRate; // Get out frame
    for (var i = 0; i < frames; i++) { // Loop through frames
            var dup = layer.duplicate(); // Duplicate layer
            dup.inPoint = (inFrame+i)/frameRate; // Set duplicate's in point
            dup.outPoint = (inFrame+i+1)/frameRate; // Set duplicate's out point
    }
    layer.enabled = false; // Disable layer
    app.endUndoGroup(); // End undo group
}
SplitLayerIntoFrames(); // Run the function