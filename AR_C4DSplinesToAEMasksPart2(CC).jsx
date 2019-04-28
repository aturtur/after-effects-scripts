/*
AR_C4DSplinesToAEMasksPart2

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_C4DSplinesToAEMasksPart2
Description-US: Imports AI sequence folder and creates animated mask(s).
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
app.beginUndoGroup("c4d-splines-to-ae-masks"); // Begin undo group
// -------------------------------------------------------------------------------------
// step 1 - import ai-folder
var codeName="_-_47UR7UR_-_";
var tempFolder=app.project.items.addFolder("_-_ATURTUR_-_F0LD3R_-_");
var myImportOptions=new ImportOptions();
var myFolder=Folder.selectDialog("Import Folder");
var myFiles=myFolder.getFiles(); 
var file;
var frameCount=0, frameWidth=0, frameHeight=0;
var itemsa=new Array();
// -------------------------------------------------------------------------------------
for(var i=1; i<=app.project.numItems; i++){itemsa[itemsa.length] = app.project.item(i);} // collect items
for (var j=0; j<itemsa.length; j++) {itemsa[j].selected = false;} // deselect items
for (var i=0; i < myFiles.length; i++){
    // Write current progress to info panel
    percent = Math.round((i/myFiles.length)*100); // Calculate progress
    clearOutput(); // Clear old stuff from info panel
    writeLn("Importing files..."); // Write stuff to info panel
    writeLn("Progress: "+percent.toString()+ " %"); // Write stuff to info panel
    myImportOptions.file = myFiles[i];
    file = app.project.importFile(myImportOptions);
    file.parentFolder = tempFolder; // put imported file to folder
}
// -------------------------------------------------------------------------------------
// new comp
var userFps = prompt("Input frame rate", 25);
var itemsc = new Array();
for(var i=1; i<=app.project.numItems; i++){itemsc[itemsc.length]=app.project.item(i);} // collect items
for (var j=0; j<itemsc.length; j++){
    if (itemsc[j].selected==true){
        frameCount++;
        frameWidth=itemsc[j].width;
        frameHeight=itemsc[j].height;
    }
} // get frame count
var comp=app.project.items.addComp("C4D Splines", frameWidth, frameHeight, 1, currentFormatToTime(frameCount, userFps), userFps) // create comp
comp.openInViewer(); // open comp
// -------------------------------------------------------------------------------------
// add files to comp
var itemsb = new Array();
for(var i=1; i<=app.project.numItems; i++){itemsb[itemsb.length]=app.project.item(i);} // collect items
for (var j=0; j<itemsb.length; j++){
    if (itemsb[j].selected==true){
        var addlayer=comp.layers.add(itemsb[j]); // add item to comp
        comp.layer(1).moveToEnd(); // move layer to the last
    }
}
// vector files to shape layers
for (var i=1; i<=comp.numLayers; i++){comp.layer(i).selected = true;} // select layers
// Write current progress to info panel
clearOutput(); // Clear old stuff from info panel
writeLn("Converting AI files..."); // Write stuff to info panel
app.executeCommand(app.findMenuCommandId("Create Shapes from Vector Layer")); // shapes from ai-files
for (var i=1; i<=comp.numLayers; i++){if(comp.layer(i).selected==false){comp.layer(i).remove();} // remove unnecessary files
}
// -------------------------------------------------------------------------------------
// step 2 - shape layers to mask layers
// shapes to masks part is based on rd_ShapesToMasks.jsx by redefinery (Jeffrey R. Almasol)
// source: http://www.redefinery.com/ae/view.php?item=rd_ShapesToMasks
var comp=app.project.activeItem;
var layers=comp.layers;
var length=layers.length;
var shapeLayer, s;
for (var x=1; x<=length; x++){
    // Write current progress to info panel
    percent = Math.round((x/length)*100); // Calculate progress
    clearOutput(); // Clear old stuff from info panel
    writeLn("Converting to mask layers..."); // Write stuff to info panel
    writeLn("Progress: "+percent.toString()+ " %"); // Write stuff to info panel
    shapeLayer=layers[x];
    shapeLayer.property("Transform").property("Anchor Point").setValue([0,0]);
    shapeLayer.property("Transform").property("Position").setValue([0,0]);
    var layerName=codeName+" "+x;
    var layer=comp.layers.addSolid([1,1,1], layerName, comp.width, comp.height, 1.0, comp.duration);
    layer.moveBefore(shapeLayer);
    var maskGroup=layer.property("ADBE Mask Parade");
    var mask, maskPath, maskVertices;        
    var shapeContents=shapeLayer.property("ADBE Root Vectors Group");
    var shapeGroup, shapeGroupContents, shapeGroupProp, shapePath;
    for (var g=1; g<=shapeContents.numProperties; g++) {
        shapeGroup=shapeContents.property(g);
        if (shapeGroup.matchName!=="ADBE Vector Group")
            continue;            
        var vertexXOffset=0, vertexYOffset=0;
            vecGroupPos=shapeGroup.property("ADBE Vector Transform Group").property("ADBE Vector Position");
            vecGroupAPt=shapeGroup.property("ADBE Vector Transform Group").property("ADBE Vector Anchor");
            vertexXOffset=-vecGroupPos.value[0]+vecGroupAPt.value[0];
            vertexYOffset=-vecGroupPos.value[1]+vecGroupAPt.value[1];
        shapeGroupContents=shapeGroup.property("Contents");
        for (var gp=1; gp<=shapeGroupContents.numProperties; gp++){
            shapeGroupProp=shapeGroupContents.property(gp);
            if (shapeGroupProp.matchName==="ADBE Vector Shape - Group"){
                shapePath=shapeGroupProp.property("ADBE Vector Shape");
                mask=maskGroup.addProperty("ADBE Mask Atom");
                if (mask!==null){
                    maskVertices = new Array();
                    for (var i=0; i<shapePath.value.vertices.length; i++)
                        maskVertices[maskVertices.length]=[shapePath.value.vertices[i][0]-vertexXOffset, shapePath.value.vertices[i][1]-vertexYOffset];
                    maskPath = new Shape();
                    maskPath.vertices = maskVertices;
                    maskPath.closed = shapePath.value.closed;
                    mask.property("ADBE Mask Shape").setValue(maskPath);
                    mask.name = shapeGroupProp.name;
                }
            }
        }
    }
    shapeLayer.remove(); // remove shape layer
}
// -------------------------------------------------------------------------------------
// step 3 - combine mask layers to one
var fps=1/comp.frameDuration; // get comp's frame rate
var prevStart=0, prevIn=0, prevOut=0;
var sub;
// sequence layers
for (var x=1; x<=comp.layers.length; x++){comp.layers[x].outPoint=1/fps;}
for (var i=1; i<=comp.layers.length; i++) {
    sub=comp.layers[i].inPoint-comp.layers[i].startTime;
    comp.layers[i].startTime=prevOut-sub;
    prevStart=comp.layers[i].startTime;
    prevIn=comp.layers[i].inPoint;
    prevOut=comp.layers[i].outPoint;
}
var lastLayerOutPoint = comp.layers[comp.layers.length].outPoint;
// check how many different paths there are
var numPaths=0;
var currPaths=0;
// layer level
for (var x=1; x<=comp.layers.length; x++){
    currPaths=0;
    // property level
    for (var g=1; g<=comp.layers[x].property("ADBE Mask Parade").numProperties; g++){currPaths++;}
    if (currPaths>numPaths) {numPaths=currPaths;}
}
// final mask layer
var myLayer=comp.layers.addSolid([0,0,0], "Masks", comp.width, comp.height, 1);
for (var n=0; n<numPaths; n++){
    var myNewMask=myLayer.property("Masks").addProperty("Mask");
    var myNewPath=myNewMask.property("Mask Path");
}
for (var i=2; i<=comp.layers.length; i++){
    for (var gp=1; gp<=comp.layers[i].property("ADBE Mask Parade").numProperties; gp++){
        var myShape=comp.layers[i].property("ADBE Mask Parade").property(gp).property("Mask Path").valueAtTime(comp.layers[i].inPoint, false);
        comp.layers[1].property("ADBE Mask Parade").property("Mask "+gp).property("Mask Path").setValueAtTime(comp.layers[i].inPoint, myShape);
    }
    // Write current progress to info panel
    percent = Math.round((i/comp.layers.length)*100); // Calculate progress
    clearOutput(); // Clear old stuff from info panel
    writeLn("Animating masks..."); // Write stuff to info panel
    writeLn("Progress: "+percent.toString()+ " %"); // Write stuff to info panel
}
// delete unnecessary layers
var allLayers=comp.layers.length;
for (var d=1;d<allLayers;d++){comp.layers[2].remove();}
myLayer.outPoint = lastLayerOutPoint; // set layer duration
// -------------------------------------------------------------------------------------
// step 4 - delete unnecessary files
var itemsx=new Array();
for(var i=1; i<=app.project.numItems; i++){itemsx[itemsx.length]=app.project.item(i);} // collect items
for (var j=0; j<itemsx.length; j++){
    if (itemsx[j].name.search(codeName)!=-1) {
        itemsx[j].remove(); // remove unnecessary mask items
    }
}
tempFolder.remove(); // remove ai-folder
// -------------------------------------------------------------------------------------
clearOutput(); // Clear old stuff from info panel
app.endUndoGroup(); // End undo group