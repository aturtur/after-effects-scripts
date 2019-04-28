/*
AR_RemoveFolders

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_RemoveFolders
Description-US: Removes folders from project item panel
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function RemoveFolders() {
    var items = new Array(); // Initialize list for project items
    var filename, fileformat; // Initialize variables
    app.beginUndoGroup("AR_RemoveFolders"); // Begin undo group
    // Iterate through project items and add those to 'items' list
    for(var i = 1; i <= app.project.numItems; i++) { items[items.length] = app.project.item(i); }
    // Flatten out project items
    for (var i = 0; i < items.length; i++) { items[i].parentFolder = app.project.rootFolder; }
    // Remove folders
    for (var i = 0; i < items.length; i++) { if (items[i] instanceof FolderItem) { items[i].remove(); } }
    app.endUndoGroup(); // End undo group
}
RemoveFolders(); // Run the function