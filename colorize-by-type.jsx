app.beginUndoGroup("colorize by type");

var comp = app.project.activeItem;
var layers = comp.layers.length;

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

// layers
var adjustmentlayer = seafoam;
var avlayer         = green;
var audiolayer      = green;
var cameralayer     = purple;
var complayer       = cyan;
var guidelayer      = none;
var lightlayer      = yellow;
var nulllayer       = none;
var shapelayer      = blue;
var solidlayer      = red;
var textlayer       = orange;

// do it
for (var i = 1; i <= layers; i++) {

    if (comp.layer(i) instanceof AVLayer) {       
        comp.layer(i).label = avlayer;

        if (!comp.layer.hasVideo) {
            comp.layer(i).label = audiolayer;
        }
        
        if (comp.layer(i).source.mainSource instanceof SolidSource) {
            comp.layer(i).label = solidlayer;
        }
        
        if (comp.layer(i).nullLayer == true) {
            comp.layer(i).label = nulllayer;
        }      
        
        if (comp.layer(i).adjustmentLayer == true) {
             comp.layer(i).label = adjustmentlayer;
        }

        if (comp.layer(i).source instanceof CompItem) {
            comp.layer(i).label = complayer;
        }
    }

    if (comp.layer(i) instanceof ShapeLayer)
    {
        comp.layer(i).label = shapelayer;
    }

    if (comp.layer(i) instanceof TextLayer)
    {
        comp.layer(i).label = textlayer;
    }

    if (comp.layer(i) instanceof CameraLayer)
    {
        comp.layer(i).label = cameralayer;
    }

    if (comp.layer(i) instanceof LightLayer)
    {
        comp.layer(i).label = lightlayer;
    }

    if (comp.layer(i).guideLayer)
    {
        comp.layer(i).label = guidelayer;
    }
}

app.endUndoGroup();