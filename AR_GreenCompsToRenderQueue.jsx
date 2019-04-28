/*
AR_GreenCompsToRenderQueue

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_GreenCompsToRenderQueue
Description-US: Connect puppet pins to tracked nulls
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function GreenCompsToRenderQueue() {
    app.beginUndoGroup("AR_GreenCompsToRenderQueue"); // Begin undo group
    var items = new Array(); // Initialize array for project items
    var rq = app.project.renderQueue; // Get render queue
    for(var i = 1; i <= app.project.numItems; i++) { items[items.length] = app.project.item(i); } // Collect project items
    for (var j = 0; j < items.length; j++) { // Loop through items
        if (items[j].typeName == "Composition") { // If item is composition
            if (items[j].label == 9) { // If label is green
                rq.items.add(items[j]); // Add comp to render queue
    app.endUndoGroup(); // End undo group
}}}} // :3
GreenCompsToRenderQueue(); // Run the function