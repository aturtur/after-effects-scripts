// basic variables
var comp = app.project.activeItem;
var fps = 1.0 / comp.frameDuration;
var rnd;
var original;
var v;
var min;
var max;
var diff;
var calc;
var base;
var s;

// ui resource string
var resourceString = "group{orientation:'column',\
    panel: Panel{text:'Options',\
        rndGroup: Group{orientation:'row',\
            rndButton: Button{text:'Shuffle', size:[120,30]},\
        },\
        sortGroup: Group{orientation:'row',\
            sortButton: Button{text:'Sort', size:[120,30]},\
        },\
        inputGroup: Group{orientation:'row',\
            inputLabel: StaticText{text:'Offset'},\
            inputText: EditText{text:'2',justify:'right', characters:4},\
            frameTextLabel: StaticText{text:'f'}\
        },\
    },\
}";

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

// create ui
var UI = createUserInterface(this, resourceString,"Shift layers");

// button random
UI.panel.rndGroup.rndButton.onClick = function() {
    comp = app.project.activeItem;
    s = comp.selectedLayers;
    fps = 1.0 / comp.frameDuration;
    v = UI.panel.inputGroup.inputText.text;
    min = -v;
    max = v;
    app.beginUndoGroup("random");
    for (var i = 0; i < s.length; i++) {
        original = s[i].startTime;              
        rnd = Math.random() * (max - min) + min;
        rnd = rnd.toFixed(0);                
        s[i].startTime = original+(rnd/fps);                
    }
    app.endUndoGroup();
}
// button sort
UI.panel.sortGroup.sortButton.onClick = function() {
    
    s = comp.selectedLayers;
    v = UI.panel.inputGroup.inputText.text;
    min = -v;
    max = v;

    app.beginUndoGroup("desc");

    for (var i = 0; i < s.length; i++) {
        // calculating base
        if (s[0].startTime != s[0].inPoint) {
            bdif = s[0].inPoint-s[0].startTime;
            original = s[0].startTime;
            base = original+bdif;
        } else if (s[0].startTime == s[0].inPoint) {
            base = s[0].startTime;
        }
        // right spot
        if(s[i].startTime != s[i].inPoint) {
            diff = s[i].inPoint - s[i].startTime;
        } else if (s[i].startTime == s[i].inPoint) {
            diff = 0;
        }
        // move layers
        if (i != 0) {
            s[i].startTime = (base-diff)+((v*i)/fps);
        }   
    }
    app.endUndoGroup();
}