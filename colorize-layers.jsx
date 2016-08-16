app.beginUndoGroup("colorize layers");

var comp = app.project.activeItem;
var layersSelected = comp.selectedLayers;

// label colors
var none     = 0;
var red      = 1;
var yellow   = 2;
var aqua     = 3;
var pink     = 4;
var lavender = 5;
var peach    = 6;
var seafoam  = 7;
var blue     = 8;
var green    = 9;
var purple   = 10;
var orange   = 11;
var brown    = 12;
var fuchsia  = 13;
var cyan     = 14;
var sandstone= 15;
var darkgreen= 16;

var colors = [red, orange, yellow, green, blue, purple, fuchsia];

if (layersSelected != 0) {
    for (var i = 0; i < layersSelected.length; i++) {
        layersSelected[i].label = colors[i % colors.length]; 
    }
} else {
    for (var i = 1; i <= comp.layers.length; i++) {
        comp.layer(i).label = colors[(i-1) % colors.length]; 
    }
}

app.endUndoGroup();