// TODO: piilota add kenttä, jos replace metodi käytössä
// TODO: case sensitive nappi
var k = 0;
var n = 0;

// ui resource string
var resourceString = "group{orientation:'column',\
    panel: Panel{text:'Options',\
        selGroup: Group{orientation:'row',\
            selLabel: StaticText{text:'Selection'},\
            sel: DropDownList{\
                activecomp: ListItem{text:'Active Comp'},\
                selectedlayers: ListItem{text:'Selected Layers'},\
                projectpanelitems: ListItem{text:'Project Panel Items'},\
                selectedprojectpanelitems: ListItem{text:'Selected Project Items'},\
                selectedproperties: ListItem{text:'Selected Properties'}\
                selection:'0',\
            },\
        },\
        metGroup: Group{orientation:'row',\
            metLabel: StaticText{text:'Method'},\
            met: DropDownList{\
                searchandreplace: ListItem{text:'Search And Replace'},\
                addprefix: ListItem{text:'Add Prefix'},\
                addsuffix: ListItem{text:'Add Suffix'}\
                selection:'0',\
            },\
        },\
        searchGroup: Group{orientation:'row',\
            searchLabel: StaticText{text:'Search'},\
            searchText: EditText{text:'',justify:'left', characters:8}\
        },\
        replaceGroup: Group{orientation:'row',\
            replaceLabel: StaticText{text:'Input'},\
            replaceText: EditText{text:'',justify:'left', characters:8}\
        },\
    },\
    okButton: Button{text:'Do It', size:[145,30]}\}";

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

// create ui and set default settings
var UI = createUserInterface(this, resourceString,"Renamer");

// when dropdownlist is changed
UI.panel.selGroup.sel.onChange = function() {
    if (UI.panel.selGroup.sel.selection == 0) {
        k = 0;
    } else if (UI.panel.selGroup.sel.selection == 1) {
        k = 1;
    } else if (UI.panel.selGroup.sel.selection == 2) {
        k = 2;
    } else if (UI.panel.selGroup.sel.selection == 3) {
        k = 3;
    } else if (UI.panel.selGroup.sel.selection == 4) {
        k = 4;
    }
}


// when dropdownlist is changed
UI.panel.metGroup.met.onChange = function() {
    if (UI.panel.metGroup.met.selection == 0) {
        n = 0;
    } else if (UI.panel.metGroup.met.selection == 1) {
        n = 1;
        n = 2;
    }
}


/*
// when dropdownlist is changed
UI.panel.engineGroup.engine.onChange = function() {
    if (UI.panel.engineGroup.engine.selection != 0) {
        UI.panel.intervalGroup.intervalText.enabled = false;
        interval = 0;
    } else {
        UI.panel.intervalGroup.intervalText.enabled = true;
        interval = UI.panel.intervalGroup.intervalText.text;
    }
}
*/

// when button is clicked
UI.okButton.onClick = function() {
    app.beginUndoGroup("renamer");

    var search = UI.panel.searchGroup.searchText.text;
    var userinput = UI.panel.replaceGroup.replaceText.text;
    //var add = UI.panel.addGroup.addText.text;
    var items = new Array();
    var res; var src;

    switch(k) {
        case 0: // active comp
            for(var i = 1; i <= app.project.activeItem.layers.length; i++) {
                src = app.project.activeItem.layers[i].name;
                switch(n) {
                    case 0: // search and replace
                        res = src.replace(search,userinput);
                        break;
                    case 1: // add prefix
                        res = userinput+src;
                        break;
                    case 2: // add suffix
                        res = src+userinput;
                        break;
                }
                app.project.activeItem.layers[i].name = res;
            }
            break;
        case 1: // selected layers
            for(var i = 0; i < app.project.activeItem.selectedLayers.length; i++) {
                src = app.project.activeItem.selectedLayers[i].name;
                switch(n) {
                    case 0: // search and replace
                        res = src.replace(search,userinput);
                        break;
                    case 1: // add prefix
                        res = userinput+src;
                        break;
                    case 2: // add suffix
                        res = src+userinput;
                        break;
                }
                app.project.activeItem.selectedLayers[i].name = res;
            }
            break;
        case 2: // project panel item
            for(var i = 1; i <= app.project.numItems; i++) {
                items[items.length] = app.project.item(i);
            }
            for (var j = 0; j < items.length; j++) {
                src = items[j].name;
                switch(n) {
                    case 0: // search and replace
                        res = src.replace(search,userinput);
                        break;
                    case 1: // add prefix
                        res = userinput+src;
                        break;
                    case 2: // add suffix
                        res = src+userinput;
                        break;
                }
                items[j].name = res;
            }
            break;
        case 3: // project panel selection
            for(var i = 0; i < app.project.selection.length; i++) {
                items[items.length] = app.project.selection[i];
            }
            for(var j = 0; j < items.length; j++) {
                src = items[j].name;
                switch(n) {
                    case 0: // search and replace
                        res = src.replace(search,userinput);
                        break;
                    case 1: // add prefix
                        res = userinput+src;
                        break;
                    case 2: // add suffix
                        res = src+userinput;
                        break;
                }
                items[j].name = res;
            }
            break;
        case 4: // selected properties
            var props = app.project.activeItem.selectedProperties;
            for(var i = 0; i < props.length; i++) {
                    src = props[i].name;
                    switch(n) {
                        case 0: // search and replace
                            res = src.replace(search,userinput);
                            break;
                        case 1: // add prefix
                            res = userinput+src;
                            break;
                        case 2: // add suffix
                            res = src+userinput;
                            break;
                    }
                    props[i].name = res;
            }
            break;
    }
    app.endUndoGroup(); 
}