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
            replaceLabel: StaticText{text:'Replace'},\
            replaceText: EditText{text:'',justify:'left', characters:8}\
        },\
        addGroup: Group{orientation:'row',\
            addLabel: StaticText{text:'Add'},\
            addText: EditText{text:'',justify:'left', characters:8}\
        },\
    },\
    okButton: Button{text:'Do It', size:[145,30]}\}";

//
var UI = createUserInterface(this, resourceString,"Renamer");
var k=0;
var n=0;
//
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

UI.panel.metGroup.met.onChange = function() {
    if (UI.panel.metGroup.met.selection == 0) {
        n = 0;
    } else if (UI.panel.metGroup.met.selection == 1) {
        n = 1;
    } else if (UI.panel.metGroup.met.selection == 2) {
        n = 2;
    }
}

//
UI.okButton.onClick = function() {
    app.beginUndoGroup("Renamer");
    // -----------------------
    var search = UI.panel.searchGroup.searchText.text;
    var replace = UI.panel.replaceGroup.replaceText.text;
    var add = UI.panel.addGroup.addText.text;
    // -----------------------
    var items = new Array();
    var res; var src;
    switch(k) {
        case 0: // active comp
            for(var i = 1; i <= app.project.activeItem.layers.length; i++) {
                src = app.project.activeItem.layers[i].name;
                switch(n) {
                    case 0: // search and replace
                        res = src.replace(search,replace);
                        break;
                    case 1: // add prefix
                        res = add+src;
                        break;
                    case 2: // add suffix
                        res = src+add;
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
                        res = src.replace(search,replace);
                        break;
                    case 1: // add prefix
                        res = add+src;
                        break;
                    case 2: // add suffix
                        res = src+add;
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
                        res = src.replace(search,replace);
                        break;
                    case 1: // add prefix
                        res = add+src;
                        break;
                    case 2: // add suffix
                        res = src+add;
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
                        res = src.replace(search,replace);
                        break;
                    case 1: // add prefix
                        res = add+src;
                        break;
                    case 2: // add suffix
                        res = src+add;
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
                            res = src.replace(search,replace);
                            break;
                        case 1: // add prefix
                            res = add+src;
                            break;
                        case 2: // add suffix
                            res = src+add;
                            break;
                    }
                    props[i].name = res;
            }
            break;
    }
    app.endUndoGroup(); 
}