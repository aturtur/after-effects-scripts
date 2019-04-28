/*
AR_MasksToFusionPolygons

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_MasksToFusionPolygons
Description-US: Creates Fusion polygon nodes from selected layer's masks. Exports only path, not feather, opacity or expansion.
Warning: 'Allow Script to Write Files and Access Network' has to be checked, since this script creates a file to temp folder.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects

function rangeMap(value, minInput, maxInput, minOutput, maxOutput) {
    var remapped = (value - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput
    return remapped
}
var comp = app.project.activeItem;
var maskLayer = comp.selectedLayers[0];
var maskGroup = maskLayer.property("ADBE Mask Parade");
var frameRate = 1 / comp.frameDuration;
var duration = (maskLayer.outPoint-maskLayer.inPoint)*frameRate;
var width = comp.width;
var height = comp.height;
var pixelAspect = 1.0;
var mask, maskPath, vertices;
var tempFolder = Folder.temp.fsName; // Get temp folder path
var theFile = new File(tempFolder+"\\createdFusionPolygons.txt"); // Create temp text file
var re = new RegExp('[^0-9a-zA-Z_]+','g');
if (theFile != null) { // If there is file
    theFile.open("w","TEXT","????");
    theFile.encoding = "UTF-8"; // Encode
    theFile.writeln("{");
    theFile.writeln("\tTools = ordered() {");
    for (var m=1; m<=maskGroup.numProperties; m++) {
        var mask, maskPath, vertices, maskName;
        for (var m=1; m<=maskGroup.numProperties; m++)
        {
            mask = maskGroup.property(m);
            maskName = mask.name;
            maskName = maskName.replace(re, '_');
            maskPath = mask.property("ADBE Mask Shape");
            theFile.writeln("\t\t"+maskName+" = PolylineMask {");
            theFile.writeln("\t\t\tDrawMode = \"ModifyOnly\",");
            theFile.writeln("\t\t\tDrawMode2 = \"InsertAndModify\",");
            theFile.writeln("\t\t\tCtrlWZoom = false,");
            theFile.writeln("\t\t\tInputs = {");
            theFile.writeln("\t\t\t\tOutputSize = Input { Value = FuID { \"Custom\" }, },");
            theFile.writeln("\t\t\t\tMaskWidth = Input { Value = "+width+", },");
            theFile.writeln("\t\t\t\tMaskHeight = Input { Value = "+height+", },");
            theFile.writeln("\t\t\t\tPixelAspect = Input { Value = { 1, 1 }, },");
            theFile.writeln("\t\t\t\tClippingMode = Input { Value = FuID { \"None\" }, },");
            theFile.writeln("\t\t\t\tPolyline = Input {");
            theFile.writeln("\t\t\t\t\tSourceOp = \"Polygon"+m+"Polyline\",");
            theFile.writeln("\t\t\t\t\tSource = \"Value\",");
            theFile.writeln("\t\t\t\t},");
            theFile.writeln("\t\t\t\tPolyline2 = Input {");
            theFile.writeln("\t\t\t\t\tValue = Polyline {");
            theFile.writeln("\t\t\t\t\t},");
            theFile.writeln("\t\t\t\t\tDisabled = true,");
            theFile.writeln("\t\t\t\t},");
            theFile.writeln("\t\t\t},");
            theFile.writeln("\t\t\tViewInfo = OperatorInfo { Pos = { 0, "+m*parseInt(50)+" } },");
            theFile.writeln("\t\t},");
            theFile.writeln("\t\tPolygon"+m+"Polyline = BezierSpline {");
            theFile.writeln("\t\t\tSplineColor = { Red = 173, Green = 255, Blue = 47 },");
            theFile.writeln("\t\t\tNameSet = true,");
            theFile.writeln("\t\t\tKeyFrames = {");
            
            for (var f=0; f<duration; f++) {
                var frame = f/frameRate;
                vertices = new Array();
                for (var v=0; v<maskPath.value.vertices.length; v++) {
                    vertices[vertices.length] = [maskPath.valueAtTime(frame, true).vertices[v][0] * pixelAspect, maskPath.valueAtTime(frame, true).vertices[v][1]];
                }
                theFile.writeln("\t\t\t\t["+f+"] = { "+f+", Flags = { Linear = true, LockedY = true }, Value = Polyline {");
                var closedSpline = maskPath.valueAtTime(frame, true).closed;
                theFile.writeln("\t\t\t\t\t\tClosed = "+ closedSpline +",");
                theFile.writeln("\t\t\t\t\t\tPoints = {");
                
                for (var i=0; i<vertices.length; i++) {
                    // Range mapping
                    var x = rangeMap(vertices[i][0], 0, width, -0.5, 0.5);
                    var y = rangeMap(vertices[i][1], 0, height, 0.5, -0.5);
                    
                    var lx = maskPath.valueAtTime(frame, true).inTangents[i][0];
                    lx = rangeMap(lx, 0, width, -0.5, 0.5) + 0.5;
                    var ly = maskPath.valueAtTime(frame, true).inTangents[i][1];
                    ly = rangeMap(ly, 0, height, 0.5, -0.5) - 0.5;
                    var rx = maskPath.valueAtTime(frame, true).outTangents[i][0];
                    rx = rangeMap(rx, 0, width, -0.5, 0.5) + 0.5;
                    var ry = maskPath.valueAtTime(frame, true).outTangents[i][1];
                    ry = rangeMap(ry, 0, height, 0.5, -0.5) -0.5;
                    
                    theFile.writeln("\t\t\t\t\t\t\t{ X = "+ x +", Y = "+ y +", LX = "+lx+", LY = "+ly+", RX = "+rx+", RY = "+ry+" },");

                    // Write current progress to info panel
                    percent = Math.round((f/duration)*100); // Calculate progress
                    clearOutput(); // Clear old stuff from info panel
                    writeLn("Mask: "+m+"/"+maskGroup.numProperties); // Write stuff to info panel
                    writeLn("Progress: "+percent.toString()+ " %"); // Write stuff to info panel
                }
                theFile.writeln("\t\t\t\t\t\t}");
                theFile.writeln("\t\t\t\t\t} },");
            }
            theFile.writeln("\t\t\t}");
            theFile.writeln("\t\t},");
        }
        theFile.writeln("\t}");
        theFile.writeln("}");
    }
    theFile.close();
    theFile.execute();
    clearOutput(); // Clear old stuff from info panel
}