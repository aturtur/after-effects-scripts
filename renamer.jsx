// renamer script
// -----------------------
var k = 4; // [ selection ]
// k0 = active comp
// k1 = selected layers
// k2 = project panel items
// k3 = selected project items
// k4 = selected properties
var n = 2; // [ method ]
// n0 = search and replace
// n1 = add prefix
// n2 = add suffix
// -----------------------
var search = "Shape";
var replace = "Okei";
var add = "_";
// -----------------------
app.beginUndoGroup("Renamer");
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
        break;}
app.endUndoGroup();