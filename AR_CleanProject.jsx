/*
AR_CleanProject

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_CleanProject
Description-US: Clean project items to own folders
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
// Variables
var items = new Array();
var filename;
var fileformat;
var make_comps = 0;
var make_videos = 0;
var make_images = 0;
var make_audio = 0;
var make_missing = 0;
var make_solids = 0;
var make_vectors = 0;
var make_oldfolders = 0;
var make_3d = 0;
var thereIsSolidsFolder = 0;
var old_solids_folder;
// Supported file formats
var audios = ['.aac','.m4a','.aif','.aiff','.mp3','.wav','.wma','.mpa']; // Audio file formats
var videos = ['.gif','.swf','.flv','.avi','.mpeg','.mov','.mp4','.wmv','.vob','.m4v','.flm','.webm','.f4v','.mpv','.r3d','.mxf']; // Video file formats
var images = ['.psd','.dpx','.cin','.jpg','.jpeg','.pxr','.bmp','.gdr','.png','.tiff','.tif','.tga','.exr','.pct','.pcx','.pbm','.raw','.nef','.cr2','.dng','.raf','.rpf','.rla','.jpe','.crw','.raf','.hdr']; // Image file formats
var vectors = ['.ai','.eps','.pdf']; // Vector file formats
var d3 = ['.obj','.c4d']; // 3D file formats
// Functions
function CleanProject() {
    app.beginUndoGroup("AR_CleanProject"); // Begin undo group called AR_CleanProject
    // Collect all items to an array
    for(var i = 1; i <= app.project.numItems; i++) { items[items.length] = app.project.item(i); }
    // Check if there are that kind of items
    for (var j = 0; j < items.length; j++) {
        if (items[j].file) {
            filename = items[j].file.name; // Get file name
            fileformat = filename.substring(filename.lastIndexOf(".")); // Get file format
            fileformat = fileformat.toLowerCase(); // File format to lower case
            for (var k = 0; k < audios.length; k++) { if (audios[k] === fileformat) { make_audio = 1; } } // Check if there is any audio file(s)
            for (var k = 0; k < videos.length; k++) { if (videos[k] === fileformat) { make_videos = 1; } } // Check if there is any video file(s)
            for (var k = 0; k < images.length; k++) { if (images[k] === fileformat) { make_images = 1; } } // Check if there is any image file(s)
            for (var k = 0; k < vectors.length; k++) { if (vectors[k] === fileformat) { make_vectors = 1; } } // Check if there is any vector file(s)
            for (var k = 0; k < d3.length; k++) { if (d3[k] === fileformat) { make_3d = 1; } } // Check if there is any 3d file(s)
        }
        if (items[j].typeName == "Composition") { make_comps = 1; } // Check if there is any compotision(s)
        if (items[j] instanceof FolderItem) { // Check if there is any folder(s)
            make_oldfolders = 1;
            if (items[j].name == "Solids") { thereIsSolidsFolder = 1; old_solids_folder = items[j]; } // Check if there is 'solids folder'
        }
        if (items[j].mainSource instanceof SolidSource) { if (thereIsSolidsFolder == 0) { make_solids = 1; } } // Check if there is solid(s)
        if (items[j].footageMissing == true) { make_missing = 1; } // Check if there is missing item(s)
    }
    // Make folders if necessary
    if (make_comps) { var folder_comps = app.project.items.addFolder("_Comps"); folder_comps.label = 0; }
    if (make_videos) { var folder_videos = app.project.items.addFolder("Videos"); folder_videos.label = 0; }
    if (make_images) { var folder_images = app.project.items.addFolder("Images"); folder_images.label = 0; }
    if (make_audio) { var folder_audio = app.project.items.addFolder("Audio"); folder_audio.label = 0; }
    if (make_missing) { var folder_missing = app.project.items.addFolder("Missing"); folder_missing.label = 0; }
    if (make_solids) { var folder_solids = app.project.items.addFolder("Solids"); folder_solids.label = 0; }
    if (make_vectors) { var folder_vectors = app.project.items.addFolder("Vectors"); folder_vectors.label = 0; }
    if (make_oldfolders) { var folder_oldfolders = app.project.items.addFolder("Old Folders"); folder_oldfolders.label = 0; }
    if (make_3d) { var folder_3d = app.project.items.addFolder("3D Files"); folder_3d.label = 0; }
    // Sort items to new folders
    for (var j = 0; j < items.length; j++) {
        if (items[j].file) {
            filename = items[j].file.name;
            fileformat = filename.substring(filename.lastIndexOf("."));
            fileformat = fileformat.toLowerCase();

            for (var k = 0; k < audios.length; k++) { if (audios[k] === fileformat) { items[j].parentFolder = folder_audio; } } // If audio format found
            for (var k = 0; k < videos.length; k++) { if (videos[k] === fileformat) { items[j].parentFolder = folder_videos; } } // If video format found
            for (var k = 0; k < images.length; k++) { if (images[k] === fileformat) { items[j].parentFolder = folder_images; } } // If image format found
            for (var k = 0; k < vectors.length; k++) { if (vectors[k] === fileformat) { items[j].parentFolder = folder_vectors; } } // If vector format found
            for (var k = 0; k < d3.length; k++) { if (d3[k] === fileformat) { items[j].parentFolder = folder_3d; } } // If 3d format found
        }
        if (items[j].typeName == "Composition") { items[j].parentFolder = folder_comps; } // If composition(s) found
        if (items[j] instanceof FolderItem) { if (items[j].name != "Solids") {items[j].parentFolder = folder_oldfolders; } } // If folder(s) found
        if (items[j].mainSource instanceof SolidSource) { if (thereIsSolidsFolder == 1) { items[j].parentFolder = old_solids_folder; } else { items[j].parentFolder = folder_solids; } } // If solid(s) found
        if (items[j].footageMissing == true) { items[j].parentFolder = folder_missing; } // If missing item(s) found
    }
    if (make_oldfolders == 1) { folder_oldfolders.remove(); } // If there is old folder(s)
    app.endUndoGroup(); // End undo group
}
CleanProject(); // Run CleanProject function