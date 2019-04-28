/*
AR_OpenCompsToRenderQueue

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_OpenCompsToRenderQueue
Description-US: Adds compositions that are open to render queue
Warning: This script does not work if you have compositions with same name!
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function OpenCompsToRenderQueue() {
    app.beginUndoGroup("AR_OpenCompsToRenderQueue"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var items = new Array(); // Initialize array for project items
    var compNames = new Array(); // Initialize array for composition names
    var openCompNames = new Array(); // Initialize array for open composition names
    var collectComps = new Array();  // Initialize array for composition objects
    var rq = app.project.renderQueue; // Get render queue
    app.executeCommand(app.findMenuCommandId("Render Queue")); // Refresh 'Window' list by toggling render queue window
    for(var i = 1; i <= app.project.numItems; i++) { items[items.length] = app.project.item(i); } // Collect project items
    for (var j = 0; j < items.length; j++) { if (items[j].typeName == "Composition") { compNames[compNames.length] = items[j].name; } } // Collect all comps names
    for (var c = 0; c < compNames.length; c++) { if (app.findMenuCommandId("Timeline: "+compNames[c]) != 0) { openCompNames[openCompNames.length] = compNames[c]; } } // Collect open comps by name
    for (var j = 0; j < items.length; j++) { // Get composition objects
        if (items[j].typeName == "Composition") {
            for (var z = 0; z < openCompNames.length; z++) { if (items[j].name == openCompNames[z]) { collectComps[collectComps.length] = items[j]; } }
        }
    }
    for (var i = 0;  i < collectComps.length; i++) { rq.items.add(collectComps[i]); } // Add compositions to render queue
    app.endUndoGroup(); // End undo group
}
OpenCompsToRenderQueue(); // Run the function