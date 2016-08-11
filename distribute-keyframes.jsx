/* resource string for ui */
var resourceString =
"group{orientation:'column',\
    panel: Panel{text:'Options',\
        engineGroup: Group{orientation:'row',\
            engineTextLabel: StaticText{text:'Method'},\
            engine: DropDownList{\
                manual: ListItem{text:'Manual'},\
                auto: ListItem{text:'Auto'},\
                layer: ListItem{text:'Layer'},\
                workArea: ListItem{text:'Work Area'},\
                comp: ListItem{text:'Comp'}\
                selection:'0',\
            },\
        },\
        intervalGroup: Group{orientation:'row',\
            intervalTextLabel: StaticText{text:'Interval'},\
            intervalText: EditText{text:'2',justify:'right', characters:4},\
            frameTextLabel: StaticText{text:'f'}\
        },\
    },\
    okButton: Button{text:'Distribute', size:[145,30]}\}";

/* user interface function */
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

/* create ui */
var UI = createUserInterface(this, resourceString,"Distribute keyframes");
    
/* dropdownlist is changed */
UI.panel.engineGroup.engine.onChange = function() {
    if (UI.panel.engineGroup.engine.selection != 0) {
        UI.panel.intervalGroup.intervalText.enabled = false;
        var interval = 0;
    } else {
        UI.panel.intervalGroup.intervalText.enabled = true;
        var interval = UI.panel.intervalGroup.intervalText.text;
    }
}

/* button is clicked */
UI.okButton.onClick = function() {
    // nice variables
    var comp = app.project.activeItem;
    var frameRate = 1 / comp.frameDuration;
    var workAreaIn = comp.workAreaStart;
    var workAreaOut = workAreaIn + comp.workAreaDuration;
    var method; var n;
    var interval = UI.panel.intervalGroup.intervalText.text;
    var twod = PropertyValueType.TwoD_SPATIAL;
    var threed = PropertyValueType.ThreeD_SPATIAL;
    var keysCount;
    var layer = comp.selectedLayers[0];
    var prop = layer.selectedProperties;
    var firstKey;
    var lastKey;
    var layerIn = layer.inPoint;
    var layerOut = layer.outPoint;

    // sweet list of arrays
    var kv      = [ ];
    var kite    = [ ];
    var kote    = [ ];
    var kiit    = [ ];
    var koit    = [ ];
    var ktab    = [ ];
    var ktc     = [ ];
    var kist    = [ ];
    var kost    = [ ];
    var ksab    = [ ];
    var ksc     = [ ];
    

    if (UI.panel.engineGroup.engine.selection == 0) {
        n = 1;
    } else if (UI.panel.engineGroup.engine.selection == 1) {
        n = 2;
    } else if (UI.panel.engineGroup.engine.selection ==  2) {
        n = 3;
    } else if (UI.panel.engineGroup.engine.selection ==  3) {
        n = 4;
    } else if (UI.panel.engineGroup.engine.selection == 4) {
        n = 5;
    }

    app.beginUndoGroup("Distribute keyframes");
    // per property
    for (var i = 0; i < prop.length; i++) {
       
        firstKey = prop[i].keyTime(1);
        lastKey = prop[i].keyTime(prop[i].numKeys);
        keysCount = prop[i].numKeys;
        
        // store data
        for (var k = 1; k <= keysCount; k++) {
            kv[kv.length] = prop[i].keyValue(k);
            kiit[kiit.length] = prop[i].keyInInterpolationType(k);
            koit[koit.length] = prop[i].keyOutInterpolationType(k);
            kite[kite.length] = prop[i].keyInTemporalEase(k);
            kote[kote.length] = prop[i].keyOutTemporalEase(k);
            ktab[ktab.length] = prop[i].keyTemporalAutoBezier(k);
            ktc[ktc.length] = prop[i].keyTemporalContinuous(k);

            if (prop[i].propertyValueType == twod || prop[i].propertyValueType == threed) {
                ksab[ksab.length] = prop[i].keySpatialAutoBezier(k);
                ksc[ksc.length] = prop[i].keySpatialContinuous(k);
                kist[kist.length] = prop[i].keyInSpatialTangent(k);
                kost[kost.length] = prop[i].keyOutSpatialTangent(k);
            }
        }

        // remove old keyframes
        while (prop[i].numKeys) {
            prop[i].removeKey(1);  
        }

        // add new keyframes
        switch (n) {

            // distribute keyframes by manually given interval
            case 1:
                for (var s = 1; s <= keysCount; s++){

                    method = firstKey + (interval/frameRate) * (s-1);
                    prop[i].setValueAtTime(method, kv[s-1]);
                    prop[i].setTemporalEaseAtKey(s, kite[s-1], kote[s-1]);
                    prop[i].setInterpolationTypeAtKey(s, kiit[s-1], koit[s-1]);
                    prop[i].setTemporalContinuousAtKey(s, ktc[s-1]);
                    prop[i].setTemporalAutoBezierAtKey(s, ktab[s-1]);
                    if(prop[i].propertyValueType == twod || prop[i].propertyValueType == threed) {
                        prop[i].setSpatialTangentsAtKey(s, kist[s-1], kost[s-1]);
                        prop[i].setSpatialAutoBezierAtKey(s, ksab[s-1]);
                        prop[i].setSpatialContinuousAtKey(s, ksc[s-1]);
                    }
                }
                break;

            // distribute keyframes based on existing keyframes (auto mode) 
            case 2:
                for (var s = 1; s <= keysCount; s++){
                    method = firstKey + (lastKey - firstKey) / (keysCount - 1) * (s-1);
                    prop[i].setValueAtTime(method, kv[s-1]);
                    prop[i].setTemporalEaseAtKey(s, kite[s-1], kote[s-1]);
                    prop[i].setInterpolationTypeAtKey(s, kiit[s-1], koit[s-1]);
                    prop[i].setTemporalContinuousAtKey(s, ktc[s-1]);
                    prop[i].setTemporalAutoBezierAtKey(s, ktab[s-1]);
                    if(prop[i].propertyValueType == twod || prop[i].propertyValueType == threed) {
                        prop[i].setSpatialTangentsAtKey(s, kist[s-1], kost[s-1]);
                        prop[i].setSpatialAutoBezierAtKey(s, ksab[s-1]);
                        prop[i].setSpatialContinuousAtKey(s, ksc[s-1]);
                    }
                }
                break;

            // distribute keyframes based on length of the layer
            case 3:
                for (var s = 1; s <= keysCount; s++){
                    method = layerIn + (layerOut - layerIn) / (keysCount - 1) * (s-1);
                    prop[i].setValueAtTime(method, kv[s-1]);
                    prop[i].setTemporalEaseAtKey(s, kite[s-1], kote[s-1]);
                    prop[i].setInterpolationTypeAtKey(s, kiit[s-1], koit[s-1]);
                    prop[i].setTemporalContinuousAtKey(s, ktc[s-1]);
                    prop[i].setTemporalAutoBezierAtKey(s, ktab[s-1]);
                    if(prop[i].propertyValueType == twod || prop[i].propertyValueType == threed) {
                        prop[i].setSpatialTangentsAtKey(s, kist[s-1], kost[s-1]);
                        prop[i].setSpatialAutoBezierAtKey(s, ksab[s-1]);
                        prop[i].setSpatialContinuousAtKey(s, ksc[s-1]);
                    }
                }
                break;

            // distribute keyframes based on length of the work area
            case 4:
                for (var s = 1; s <= keysCount; s++){
                    method = workAreaIn + (workAreaOut - workAreaIn) / (keysCount - 1) * (s-1);
                    prop[i].setValueAtTime(method, kv[s-1]);
                    prop[i].setTemporalEaseAtKey(s, kite[s-1], kote[s-1]);
                    prop[i].setInterpolationTypeAtKey(s, kiit[s-1], koit[s-1]);
                    prop[i].setTemporalContinuousAtKey(s, ktc[s-1]);
                    prop[i].setTemporalAutoBezierAtKey(s, ktab[s-1]);
                    if(prop[i].propertyValueType == twod || prop[i].propertyValueType == threed) {
                        prop[i].setSpatialTangentsAtKey(s, kist[s-1], kost[s-1]);
                        prop[i].setSpatialAutoBezierAtKey(s, ksab[s-1]);
                        prop[i].setSpatialContinuousAtKey(s, ksc[s-1]);
                    }
                }
                break;

            // distribute keyframes based on length of the comp
            case 5:
                for (var s = 1; s <= keysCount; s++){
                    method = comp.duration / (keysCount - 1) * (s-1);
                    prop[i].setValueAtTime(method, kv[s-1]);
                    prop[i].setTemporalEaseAtKey(s, kite[s-1], kote[s-1]);
                    prop[i].setInterpolationTypeAtKey(s, kiit[s-1], koit[s-1]);
                    prop[i].setTemporalContinuousAtKey(s, ktc[s-1]);
                    prop[i].setTemporalAutoBezierAtKey(s, ktab[s-1]);
                    if(prop[i].propertyValueType == twod || prop[i].propertyValueType == threed) {
                        prop[i].setSpatialTangentsAtKey(s, kist[s-1], kost[s-1]);
                        prop[i].setSpatialAutoBezierAtKey(s, ksab[s-1]);
                        prop[i].setSpatialContinuousAtKey(s, ksc[s-1]);
                    }
                }
                break;
        }

        kv      = [ ];
        kite    = [ ];
        kote    = [ ];
        kiit    = [ ];
        koit    = [ ];
        ktab    = [ ];
        ktc     = [ ];
        kist    = [ ];
        kost    = [ ];
        ksab    = [ ];
        ksc     = [ ];
    }
    app.endUndoGroup(); 
}