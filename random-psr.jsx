var resourceString =
"group{orientation:'column',\
        checkGroup: Group{orientation:'row',\
            positionBox: Checkbox{text:'Position', value:1},\
            scaleBox: Checkbox{text:'Scale', value:0},\
            rotationBox: Checkbox{text:'Rotation', value:0},\
        },\
        tabs: Panel { type: 'tabbedpanel', maximumSize:[240,200],\
            subtab1: Panel { type: 'tab', text:'Position',\
                pg1: Group{orientation:'row',\
                    xBox: Checkbox{text:'X', value:1},\
                    xMinLabel: StaticText{text:'Min X'},\
                    xMinText: EditText{text:'0',justify:'right', characters:4},\
                    xMaxLabel: StaticText{text:'Max X'},\
                    xMaxText: EditText{text:'width',justify:'right', characters:4},\
                },\
                pg2: Group{orientation:'row',\
                    yBox: Checkbox{text:'Y', value:1},\
                    yMinLabel: StaticText{text:'Min Y'},\
                    yMinText: EditText{text:'0',justify:'right', characters:4},\
                    yMaxLabel: StaticText{text:'Max Y'},\
                    yMaxText: EditText{text:'height',justify:'right', characters:4},\
                },\
            },\
            subtab2: Panel { type: 'tab', text:'Scale',\
                sg: Group{orientation:'row',\
                    sMinLabel: StaticText{text:'Min'},\
                    sMinText: EditText{text:'0',justify:'right', characters:4},\
                    sMaxLabel: StaticText{text:'Max'},\
                    sMaxText: EditText{text:'100',justify:'right', characters:4},\
                },\
            },\
            subtab3: Panel { type: 'tab', text:'Rotation',\
                rg: Group{orientation:'row',\
                    rMinLabel: StaticText{text:'Min'},\
                    rMinText: EditText{text:'0',justify:'right', characters:4},\
                    rMaxLabel: StaticText{text:'Max'},\
                    rMaxText: EditText{text:'360',justify:'right', characters:4},\
                },\
            },\
        },\
    okButton: Button{text:'Randomise'}\}";

var UI = createUserInterface(this, resourceString,"Randomise PSR");

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

//
UI.tabs.subtab1.pg1.xBox.onClick = function() {
    if (UI.tabs.subtab1.pg1.xBox.value == 0) {
        UI.tabs.subtab1.pg1.xMinText.enabled = false;
        UI.tabs.subtab1.pg1.xMaxText.enabled = false;
    } else {
        UI.tabs.subtab1.pg1.xMinText.enabled = true;
        UI.tabs.subtab1.pg1.xMaxText.enabled = true;
    }
}
UI.tabs.subtab1.pg2.yBox.onClick = function() {
    if (UI.tabs.subtab1.pg2.yBox.value == 0) {
        UI.tabs.subtab1.pg2.yMinText.enabled = false;
        UI.tabs.subtab1.pg2.yMaxText.enabled = false;
    } else {
        UI.tabs.subtab1.pg1.yMinText.enabled = true;
        UI.tabs.subtab1.pg1.yMaxText.enabled = true;
    }
}

//
UI.okButton.onClick = function() {

    var comp = app.project.activeItem;
    var selection = comp.selectedLayers;
    var time = comp.time;
    
    var position = UI.checkGroup.positionBox.value;
    var scale = UI.checkGroup.scaleBox.value;
    var rotation = UI.checkGroup.rotationBox.value;

    var xBox = UI.tabs.subtab1.pg1.xBox.value;
    var yBox = UI.tabs.subtab1.pg2.yBox.value;

    var xMin = UI.tabs.subtab1.pg1.xMinText.text;
    var xMax = UI.tabs.subtab1.pg1.xMaxText.text;
    var yMin = UI.tabs.subtab1.pg2.yMinText.text;
    var yMax = UI.tabs.subtab1.pg2.yMaxText.text;

    var sMin = UI.tabs.subtab2.sg.sMinText.text;
    var sMax = UI.tabs.subtab2.sg.sMaxText.text;    

    var rMin = UI.tabs.subtab3.rg.rMinText.text;
    var rMax = UI.tabs.subtab3.rg.rMaxText.text;

    var xRnd;
    var yRnd;
    var rnd;

    app.beginUndoGroup("random-psr");

    // position
    if (position == true) {
        for (var i = 0; i < selection.length; i++) {
            // --------------------------------------------
            // position input extras
            // x
            if (xMin == "width") {
                xMin = comp.width;
            } else if (xMin == "height") {
                xMin = comp.height;
            } else if (xMin == "current") {
                xMin = selection[i].position.value[0];
            }

            if (xMax == "width") {
                xMax = comp.width;
            } else if (xMax == "height") {
                xMax = comp.height;
            } else if (xMax == "current") {
                xMax = selection[i].position.value[0];
            }
            // y
            if (yMin == "height") {
                yMin = comp.height;
            } else if (yMin == "width") {
                yMin = comp.width;
            } else if (yMin == "current") {
                yMin = selection[i].position.value[1];
            }

            if (yMax == "height") {
                yMax = comp.height;
            } else if (yMax == "width") {
                yMax = comp.width;
            } else if (yMax == "current") {
                yMax = selection[i].position.value[1];
            }

            // --------------------------------------------
            if (xBox) {                
                xRnd = Math.random() * (xMax - xMin) + xMin;
            } else {
                xRnd = selection[i].position.value[0];
            }

            if (yBox) {                
                yRnd = Math.random() * (yMax - yMin) + yMin;
            } else {
                yRnd = selection[i].position.value[1];
            }
            // --------------------------------------------
            if (selection[i].position.numKeys == 0) {
                selection[i].position.setValue([xRnd,yRnd]);
            } else {
                selection[i].position.setValueAtTime(time,[xRnd,yRnd]);
            }
        }            
    }
    // scale
    if (scale == true) {
        for (var i = 0; i < selection.length; i++) {

            rnd = Math.random() * (sMax - sMin) + sMin;
            
            if (selection[i].scale.numKeys == 0) {
                selection[i].scale.setValue([rnd,rnd]);
            } else {
                selection[i].scale.setValueAtTime(time,[rnd,rnd]);
            }
        }
    }
    // rotation
    if (rotation == true) {
        for (var i = 0; i < selection.length; i++) {

            rnd = Math.random() * (rMax - rMin) + rMin;
            
            if (selection[i].rotation.numKeys == 0) {
                selection[i].rotation.setValue(rnd);
            } else {
                selection[i].rotation.setValueAtTime(time,rnd);
            }
        }
    }
    app.endUndoGroup();
}