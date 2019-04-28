/*
AR_CreateFusionLoaders

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_CreateFusionLoaders
Description-US: Creates Fusion loader nodes from selected layers. Selected layer needs to be an AVLayer! Does not export raw settings!
Warning: 'Allow Script to Write Files and Access Network' has to be checked, since this script creates a file to temp folder.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
// Additional functions
var splitByLast = function(text, separator) {
    var index = text.lastIndexOf(separator);
    return [text.slice(0, index), text.slice(index + 1)]
}
// Common variables
var comp = app.project.activeItem; // Get active composition
var layers = comp.selectedLayers; // Get selected layers
var loaders = []; // Initialize array for loaders
var loaderNum = 1; // Number of loaders

// Loop
for (var i = 0; i < layers.length; i++) {
    var layer = layers[i]; // Changing layer
    var filePath = layer.source.mainSource.file.fsName; // Full file path
    var extension = splitByLast(filePath, ".")[1]; // Get file extension
    filePath = filePath.replace(/\\/g , "\\\\"); // For Windows paths
    var frameRate = layer.source.frameRate; // Get frame rate from source
    var inFrame = (layer.inPoint-layer.startTime)*frameRate; // AVLayer in point in frames
    var outFrame = ((layer.outPoint-layer.startTime)*frameRate)-1; // AVLayer out point in frames
    var fullDuration = (layer.source.duration/layer.source.frameDuration)-1; // Source duration in frames
    var clipDuration = Math.floor(outFrame-inFrame); // Trimmed AVLayer duration in frames    
    var splitted = filePath.split(/(\d+\.)/g); // Split file path to list
    var startFrame = splitted[splitted.length - 2] // Get last split
    startFrame = startFrame.replace(".", ""); // Get rid of that dot
    startFrame = parseInt(startFrame, 10); // Remove leading zeros

    switch(extension) {
            // Image sequences
            case "jpg":
                var fileFormat = "JpegFormat";
                var specialA = "\n                    StartFrame = "+startFrame+",";
                var specialB = "\"LengthSetManually = true\",";
                break;
            case "png":
                var fileFormat = "PNGFormat";
                var specialA = "\n                    StartFrame = "+startFrame+",";
                var specialB = "LengthSetManually = true,";
                break;
            case "tif":
                var fileFormat = "TiffFormat";
                var specialA = "\n                    StartFrame = "+startFrame+",";
                var specialB = "LengthSetManually = true,";
                break;
            case "dpx":
                var fileFormat = "DPXFormat";
                var specialA = "\n                    StartFrame = "+startFrame+",";
                var specialB = "LengthSetManually = true,";
                break;
            case "exr":
                var fileFormat = "OpenEXRFormat";
                var specialA = "\n                    StartFrame = "+startFrame+",";
                var specialB = "LengthSetManually = true,";
                break;
            // Video files
            case "mov":
                var fileFormat = "QuickTimeMovies";
                var specialA = "";
                var specialB = "Multiframe = true,";
                break;
            case "mp4":
                var fileFormat = "QuickTimeMovies";
                var specialA = "";
                var specialB = "Multiframe = true,";
                break;
            case "R3D":
                var fileFormat = "R3DFormat";
                var specialA = "";
                var specialB = "Multiframe = true,";
                break;
            default:
                break;
    }

    // Create loader for clip
    var loader = "\
        Loader"+loaderNum+" = Loader {\
            Clips = {\
                Clip {\
                    ID = \"Clip1\",\
                    Filename = \""+filePath+"\",\
                    FormatID = \""+fileFormat+"\",\
                    Length = "+fullDuration+","+specialA+"\
                    "+specialB+"\
                    TrimIn = "+inFrame+",\
                    TrimOut = "+outFrame+",\
                    ExtendFirst = 0,\
                    ExtendLast = 0,\
                    Loop = 1,\
                    AspectMode = 0,\
                    Depth = 0,\
                    TimeCode = 0,\
                    GlobalStart = 0,\
                    GlobalEnd = "+clipDuration+"\
                }\
            },\
                CtrlWZoom = false,\
                Inputs = {\
                    [\"Gamut.SLogVersion\"] = Input { Value = FuID { \"SLog2\" }, },\
                },\
                ViewInfo = OperatorInfo { Pos = { 0, "+loaderNum*parseInt(50)+" } },\
        }";
    loaders.push(loader); // Add loader to loaders array
    loaderNum++; // Increase number of loaders
}

// Build
var clipStart = "{\
    Tools=ordered(){";
var loaders = loaders.join(",");
var clipEnd= "\
    }\
}";
var toClipBoard = clipStart+loaders+clipEnd; // Combine all the stuff

// Export
//var theFile = File.saveDialog("Where to save?", "Loader data:*.txt");
var tempFolder = Folder.temp.fsName; // Get temp folder path
var theFile = new File(tempFolder+"\\createdFusionLoaders.txt"); // Create temp text file
if (theFile != null) { // If there is file
    theFile.open("w","TEXT","????"); // Open file for writing
    theFile.encoding = "UTF-8"; // Encode
    theFile.writeln(toClipBoard);
    theFile.close(); // Close file writing
    theFile.execute(); // Open file in default text editor
}