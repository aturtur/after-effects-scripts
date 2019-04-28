
/*
AR_AddFolders

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_AddFolders
Description-US: Creates folders to project item panel
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function AddFolders() {
    app.beginUndoGroup("AR_AddFolders"); // Begin undo group
    // Create folders
    var comps = app.project.items.addFolder("_COMPS");
    var outputs = app.project.items.addFolder("Outputs");
    var audio = app.project.items.addFolder("Audio");
    var sourcefootage = app.project.items.addFolder("Source footage");
    var versions = app.project.items.addFolder("Versions");
    var graded = app.project.items.addFolder("Graded");
    var offline = app.project.items.addFolder("Offline");
    var elements = app.project.items.addFolder("Elements");
    var vfx = app.project.items.addFolder("VFX");
    var graphics = app.project.items.addFolder("Graphics");
    var gfclient = app.project.items.addFolder("Graphics from client");
    var stock = app.project.items.addFolder("Stock footage");
    var ztemp = app.project.items.addFolder("z-temp");

    // Folders colors
    comps.label = 0;
    outputs.label = 0;
    audio.label = 0;
    sourcefootage.label = 0;
    versions.label = 0;
    graded.label = 0;
    offline.label = 0;
    elements.label = 0;
    vfx.label = 0;
    graphics.label = 0;
    gfclient.label = 0;
    stock.label = 0;
    ztemp.label = 0;

    // Parenting
    outputs.parentFolder = comps;
    graded.parentFolder = versions;
    offline.parentFolder = versions;
    vfx.parentFolder = elements;
    graphics.parentFolder = elements;
    gfclient.parentFolder = elements;
    stock.parentFolder = elements;

    app.endUndoGroup(); // End undo group
}
AddFolders(); // Run the script