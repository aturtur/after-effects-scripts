// variables
var items = new Array();
var filename;
var fileformat;
var make_comps = 0;
var make_videos = 0;
var make_images = 0;
var make_audio = 0;
var make_missing = 0;
var make_vectors = 0;
var make_oldfolders = 0;
var make_3d = 0;

// file formats
var audios = ['.aac','.m4a','.aif','.aiff','.mp3','.wav','.wma','.mpa'];
var videos = ['.gif','.swf','.flv','.avi','.mpeg','.mov','.mp4','.wmv','.vob','.m4v','.flm','.webm','.f4v','.mpv','.R3D'];
var images = ['.psd','.dpx','.cin','.jpg','.jpeg','.pxr','.bmp','.gdr','.png','.tiff','.tif','.tga','.exr','.pct','.pcx','.pbm','.raw','.nef','.cr2','.dng','.raf','.rpf','.rla','.jpe','.crw','.raf','.hdr'];
var vectors = ['.ai','.eps','.pdf'];        
var d3 = ['.obj','.c4d'];
              
app.beginUndoGroup("clean project");

// collect items to array
for(var i = 1; i <= app.project.numItems; i++) {
    items[items.length] = app.project.item(i);
}
//  check if there are that kind of items
for (var j = 0; j < items.length; j++) {
    if (items[j].file) {
        filename = items[j].file.name;
        fileformat = filename.substring(filename.lastIndexOf("."));
        fileformat = fileformat.toLowerCase();

        // if audio format found
        for (var k = 0; k < audios.length; k++) {
            if (audios[k] === fileformat) {
                make_audio = 1;
            }
        }
        // if video format found
        for (var k = 0; k < videos.length; k++) {
            if (videos[k] === fileformat) {
                make_videos = 1;
            }
        }
        // if image format found
        for (var k = 0; k < images.length; k++) {
            if (images[k] === fileformat) {
                make_images = 1;
            }
        }
        // if vector format found
        for (var k = 0; k < vectors.length; k++) {
            if (vectors[k] === fileformat) {
                make_vectors = 1;
            }
        }
        // if 3d format found
        for (var k = 0; k < d3.length; k++) {
            if (d3[k] === fileformat) {
                make_3d = 1;
            }
        }
    }
    // compositions
    if (items[j].typeName == "Composition") {
        make_comps = 1;
    }
    // folders
    if (items[j] instanceof FolderItem) {
        make_oldfolders = 1;
    }
    // missing
    if (items[j].footageMissing == true) {
        make_missing = 1;
    }
}
// make folders if necessary
if (make_comps) {
    var folder_comps = app.project.items.addFolder("_Comps");
    folder_comps.label = 0;
}
if (make_videos) {
    var folder_videos = app.project.items.addFolder("Videos");
    folder_videos.label = 0;
}
if (make_images) {
    var folder_images = app.project.items.addFolder("Images");
    folder_images.label = 0;
}
if (make_audio) {
    var folder_audio = app.project.items.addFolder("Audio");
    folder_audio.label = 0;
}
if (make_missing) {
    var folder_missing = app.project.items.addFolder("Missing");
    folder_missing.label = 0;
}
if (make_vectors) {
    var folder_vectors = app.project.items.addFolder("Vectors");
    folder_vectors.label = 0;
}
if (make_oldfolders) {
    var folder_oldfolders = app.project.items.addFolder("Old Folders");
    folder_oldfolders.label = 0;
}
if (make_3d) {
    var folder_3d = app.project.items.addFolder("3D Files");
    folder_3d.label = 0;
}

// sort items to new folders
for (var j = 0; j < items.length; j++) {
    if (items[j].file) {
        filename = items[j].file.name;
        fileformat = filename.substring(filename.lastIndexOf("."));
        fileformat = fileformat.toLowerCase();

        // if audio format found
        for (var k = 0; k < audios.length; k++) {
            if (audios[k] === fileformat) {
                items[j].parentFolder = folder_audio;
            }
        }
        // if video format found
        for (var k = 0; k < videos.length; k++) {
            if (videos[k] === fileformat) {
                items[j].parentFolder = folder_videos;
            }
        }
        // if image format found
        for (var k = 0; k < images.length; k++) {
            if (images[k] === fileformat) {
                items[j].parentFolder = folder_images;
            }
        }
        // if vector format found
        for (var k = 0; k < vectors.length; k++) {
            if (vectors[k] === fileformat) {
                items[j].parentFolder = folder_vectors;
            }
        }
        // if 3d format found
        for (var k = 0; k < d3.length; k++) {
            if (d3[k] === fileformat) {
                items[j].parentFolder = folder_3d;
            }
        }
    }
    // compositions
    if (items[j].typeName == "Composition") {
        items[j].parentFolder = folder_comps;
    }
    // folders
    if (items[j] instanceof FolderItem) {
        if (items[j].name != "Solids") {        
            items[j].parentFolder = folder_oldfolders;
        }
    }
    // missing
    if (items[j].footageMissing == true) {
        items[j].parentFolder = folder_missing;
    }
}
if (make_oldfolders == 1) {
    folder_oldfolders.remove();
}
app.endUndoGroup();