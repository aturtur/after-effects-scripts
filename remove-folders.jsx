// variables
var items = new Array();
var filename;
var fileformat;
var make_comps = 0;
app.beginUndoGroup("remove folders");
for(var i = 1; i <= app.project.numItems; i++) {
    items[items.length] = app.project.item(i);
}
for (var j = 0; j < items.length; j++) {
    if (items[j] instanceof FolderItem) {
        make_oldfolders = 1;
        if (items[j].name == "Solids") {
            thereIsSolidsFolder = 1;
            old_solids_folder = items[j];
        }
    }
}
if (make_oldfolders) {
    var folder_oldfolders = app.project.items.addFolder("Old Folders");
    folder_oldfolders.label = 0;
}

for (var j = 0; j < items.length; j++) {
    items[j].parentFolder = app.project.rootFolder;
    if (items[j] instanceof FolderItem) {
        items[j].parentFolder = folder_oldfolders;
    }

}
if (make_oldfolders == 1) {
    folder_oldfolders.remove();
}
app.endUndoGroup();