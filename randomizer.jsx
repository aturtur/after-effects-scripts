// basic variables
var comp, selection, time, xBox, yBox, xMin, xMax, yMin, yMax, sMin;
var sMax, rMin, rMax, oMin, oMax, xRnd, yRnd, sRnd, rRnd, oRnd;

// ui resource string
var resourceString =
"group{orientation:'column',\
        tabs: Panel { type: 'tabbedpanel', maximumSize:[240,200],\
            postab: Panel { type: 'tab', text:'Pos',\
                pg1: Group{orientation:'row',\
                    xBox: Checkbox{text:'X', value:1},\
                    xMinLabel: StaticText{text:'Min X'},\
                    xMinText: EditText{text:'0',justify:'right', characters:4},\
                    xMaxLabel: StaticText{text:'Max X'},\
                    xMaxText: EditText{text:'width',justify:'right', characters:4}\
                },\
                pg2: Group{orientation:'row',\
                    yBox: Checkbox{text:'Y', value:1},\
                    yMinLabel: StaticText{text:'Min Y'},\
                    yMinText: EditText{text:'0',justify:'right', characters:4},\
                    yMaxLabel: StaticText{text:'Max Y'},\
                    yMaxText: EditText{text:'height',justify:'right', characters:4}\
                },\
                pButton: Button{text:'Randomise position'}\
            },\
            stab: Panel { type: 'tab', text:'Scl',\
                sg: Group{orientation:'row',\
                    sMinLabel: StaticText{text:'Min'},\
                    sMinText: EditText{text:'0',justify:'right', characters:4},\
                    sMaxLabel: StaticText{text:'Max'},\
                    sMaxText: EditText{text:'100',justify:'right', characters:4}\
                },\
                sButton: Button{text:'Randomise scale'}\
            },\
            rtab: Panel { type: 'tab', text:'Rot',\
                rg: Group{orientation:'row',\
                    rMinLabel: StaticText{text:'Min'},\
                    rMinText: EditText{text:'0',justify:'right', characters:4},\
                    rMaxLabel: StaticText{text:'Max'},\
                    rMaxText: EditText{text:'360',justify:'right', characters:4}\
                },\
                rButton: Button{text:'Randomise rotation'}\
            },\
            otab: Panel { type: 'tab', text:'O',\
                og: Group{orientation:'row',\
                    oMinLabel: StaticText{text:'Min'},\
                    oMinText: EditText{text:'0',justify:'right', characters:4},\
                    oMaxLabel: StaticText{text:'Max'},\
                    oMaxText: EditText{text:'100',justify:'right', characters:4}\
                },\
                oButton: Button{text:'Randomise opacity'}\
            },\
        }\}";

// ui function
function createUserInterface (thisObj, userInterfaceString, scriptName){
    var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", scriptName, undefined, {resizeable: true});
    if (pal == null) return pal;    
    var UI=pal.add(userInterfaceString);
    pal.layout.layout(true);
    pal.layout.resize();
    pal.onResizing = pal.onResize = function() {
        this.layout.resize;
    }
    if ((pal != null) && (pal instanceof Window)) {
        pal.show();
    }
    return UI;
};

var UI = createUserInterface(this, resourceString,"Randomise PSRO");

//
UI.tabs.postab.pg1.xBox.onClick = function() {
    if (UI.tabs.postab.pg1.xBox.value == 0) {
        UI.tabs.postab.pg1.xMinText.enabled = false;
        UI.tabs.postab.pg1.xMaxText.enabled = false;
    } else {
        UI.tabs.postab.pg1.xMinText.enabled = true;
        UI.tabs.postab.pg1.xMaxText.enabled = true;
    }
}

//
UI.tabs.postab.pg2.yBox.onClick = function() {
    if (UI.tabs.postab.pg2.yBox.value == 0) {
        UI.tabs.postab.pg2.yMinText.enabled = false;
        UI.tabs.postab.pg2.yMaxText.enabled = false;
    } else {
        UI.tabs.postab.pg2.yMinText.enabled = true;
        UI.tabs.postab.pg2.yMaxText.enabled = true;
    }
}

// position button
UI.tabs.postab.pButton.onClick = function() {

    app.beginUndoGroup("random-p");

    comp = app.project.activeItem;
    selection = comp.selectedLayers;
    time = comp.time;

    xBox = UI.tabs.postab.pg1.xBox.value;
    yBox = UI.tabs.postab.pg2.yBox.value;

    xMin = UI.tabs.postab.pg1.xMinText.text;
    xMax = UI.tabs.postab.pg1.xMaxText.text;
    yMin = UI.tabs.postab.pg2.yMinText.text;
    yMax = UI.tabs.postab.pg2.yMaxText.text;

    for (var i = 0; i < selection.length; i++) {

        // position input extras
        // x
        if (xMin == "width") {
            xMin = comp.width;
        } else if (xMin == "height") {
            xMin = comp.height;
        } else if (xMin == "current") {
            xMin = selection[i].position.value[0];
        } else {
            xMin = parseInt(xMin);
        }

        if (xMax == "width") {
            xMax = comp.width;
        } else if (xMax == "height") {
            xMax = comp.height;
        } else if (xMax == "current") {
            xMax = selection[i].position.value[0];
        } else {
            xMax = parseInt(xMax);
        }
        // y
        if (yMin == "height") {
            yMin = comp.height;
        } else if (yMin == "width") {
            yMin = comp.width;
        } else if (yMin == "current") {
            yMin = selection[i].position.value[1];
        } else {
            yMin = parseInt(yMin);
        }

        if (yMax == "height") {
            yMax = comp.height;
        } else if (yMax == "width") {
            yMax = comp.width;
        } else if (yMax == "current") {
            yMax = selection[i].position.value[1];
        } else {
            yMax = parseInt(yMax);
        }

        // if x checkbox is checked
        if (xBox) {                
            xRnd = Math.floor(Math.random() * ((xMax-xMin)+1) + xMin);
        } else {
            xRnd = selection[i].position.value[0];
        }
        
        // if y checkbox is checked
        if (yBox) {                
            yRnd = Math.floor(Math.random() * ((yMax-yMin)+1) + yMin);
        } else {
            yRnd = selection[i].position.value[1];
        }
        
        // if there is no keyframes
        if (selection[i].position.numKeys == 0) {
            selection[i].position.setValue([xRnd,yRnd]);
        // if there is keyframes
        } else {
            selection[i].position.setValueAtTime(time,[xRnd,yRnd]);
        }
    }            
    app.endUndoGroup();
}

// scale button
UI.tabs.stab.sButton.onClick = function() {

    app.beginUndoGroup("random-s");

    comp = app.project.activeItem;
    selection = comp.selectedLayers;
    time = comp.time;

    sMin = parseInt(UI.tabs.stab.sg.sMinText.text);
    sMax = parseInt(UI.tabs.stab.sg.sMaxText.text);

    for (var j = 0; j < selection.length; j++) {

        sRnd = Math.floor(Math.random() * ((sMax-sMin)+1) + sMin);
        
        if (selection[j].scale.numKeys == 0) {
            selection[j].scale.setValue([sRnd,sRnd]);
        } else {
            selection[j].scale.setValueAtTime(time,[sRnd,sRnd]);
        }
    }
    app.endUndoGroup();
}

// rotation button
UI.tabs.rtab.rButton.onClick = function() {

    app.beginUndoGroup("random-psro");

    comp = app.project.activeItem;
    selection = comp.selectedLayers;
    time = comp.time;

    rMin = parseInt(UI.tabs.rtab.rg.rMinText.text);
    rMax = parseInt(UI.tabs.rtab.rg.rMaxText.text);

    for (var k = 0; k < selection.length; k++) {

        rRnd = Math.floor(Math.random() * ((rMax-rMin)+1) + rMin);

        if (selection[k].rotation.numKeys == 0) {
            selection[k].rotation.setValue([rRnd]);
        } else {
            selection[k].rotation.setValueAtTime(time,[rRnd]);
        }
    }
    app.endUndoGroup();
}

// opacity button
UI.tabs.otab.oButton.onClick = function() {

    app.beginUndoGroup("random-psro");

    comp = app.project.activeItem;
    selection = comp.selectedLayers;
    time = comp.time;

    oMin = parseInt(UI.tabs.otab.og.oMinText.text);
    oMax = parseInt(UI.tabs.otab.og.oMaxText.text);

    for (var h = 0; h < selection.length; h++) {

        oRnd = Math.floor(Math.random() * ((oMax-oMin)+1) + oMin);
        
        if (selection[h].opacity.numKeys == 0) {
            selection[h].opacity.setValue([oRnd]);
        } else {
            selection[h].opacity.setValueAtTime(time,[oRnd]);
        }
    }
    app.endUndoGroup();
}