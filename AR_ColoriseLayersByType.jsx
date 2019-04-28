/*
AR_ColoriseLayersByType

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ColoriseByType
Description-US: Colorises selected layers by type
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function ColoriseByType() {
    app.beginUndoGroup("Colorize By Type"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var colors = {'none': 0, 'red': 1, 'yellow': 2, 'aqua': 3, 'pink': 4, 'lavender': 5, 'peach': 6, 'seafoam': 7, 'blue': 8, 
    'green': 9, 'purple': 10, 'orange': 11, 'brown': 12, 'fuchsia': 13, 'cyan': 14, 'sandstone': 15, 'darkgreen': 16}; // Label colors
    var adjustmentlayer = colors['seafoam'];
    var avlayer         = colors['green'];
    var audiolayer      = colors['green'];
    var cameralayer     = colors['purple'];
    var complayer       = colors['cyan'];
    var guidelayer      = colors['sandstone'];
    var lightlayer      = colors['yellow'];
    var nulllayer       = colors['none'];
    var shapelayer      = colors['blue'];
    var solidlayer      = colors['red'];
    var textlayer       = colors['orange'];
    if (layers != 0) { // If there is layer selection
        for (var i = 0; i < layers.length; i++) { // Loop through layers
            if (layers[i] instanceof AVLayer) { layers[i].label = avlayer; // If avlayer
                if (!layers[i].hasVideo) { layers[i].label = audiolayer; } // If audio layer
                if (layers[i].source.mainSource instanceof SolidSource) { layers[i].label = solidlayer; } // If solid layer
                if (layers[i].nullLayer == true) { layers[i].label = nulllayer; } // If null layer
                if (layers[i].adjustmentLayer == true) { layers[i].label = adjustmentlayer; } // If adjustment layer
                if (layers[i].source instanceof CompItem) { layers[i].label = complayer; } // If composition layer
            }
            if (layers[i] instanceof ShapeLayer) { layers[i].label = shapelayer; } // If shape layer
            if (layers[i] instanceof TextLayer) { layers[i].label = textlayer; } // If text layer
            if (layers[i] instanceof CameraLayer) { layers[i].label = cameralayer; } // If camera layer
            if (layers[i] instanceof LightLayer) { layers[i].label = lightlayer; } // If light layer
            if (layers[i].guideLayer) { layers[i].label = guidelayer; } // If guide layer
        }
    } else { // If there is no layer selection
        for (var i = 1; i <= comp.layers.length; i++) { // Iterate through layers
            if (comp.layer(i) instanceof AVLayer) { comp.layer(i).label = avlayer; // If AVLayer
                if (!comp.layer(i).hasVideo) { comp.layer(i).label = audiolayer; } // If audio layer
                if (comp.layer(i).source.mainSource instanceof SolidSource) { comp.layer(i).label = solidlayer; } // If solid layer
                if (comp.layer(i).nullLayer == true) { comp.layer(i).label = nulllayer; } // If null layer
                if (comp.layer(i).adjustmentLayer == true) { comp.layer(i).label = adjustmentlayer; } // If adjustment layer
                if (comp.layer(i).source instanceof CompItem) { comp.layer(i).label = complayer; } // If composition layer
            }
            if (comp.layer(i) instanceof ShapeLayer) { comp.layer(i).label = shapelayer; } // If shape layer
            if (comp.layer(i) instanceof TextLayer) { comp.layer(i).label = textlayer; } // If text layer
            if (comp.layer(i) instanceof CameraLayer) { comp.layer(i).label = cameralayer; } // If camera layer
            if (comp.layer(i) instanceof LightLayer) { comp.layer(i).label = lightlayer; } // If light layer
            if (comp.layer(i).guideLayer) { comp.layer(i).label = guidelayer; } // If guide layer
        }
    }
    app.endUndoGroup(); // End undo group
}
ColoriseByType(); // Run the function