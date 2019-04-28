/*
AR_ColoriseLayers

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_ColoriseLayers
Description-US: Colorises selected layers with color cycle. If there is no layer selection, then all layers are colorised.
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function ColoriseLayers() {
    app.beginUndoGroup("Colorise Layers"); // Begin undo gorup
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers; // Get selected layers
    var colors = {'none': 0, 'red': 1, 'yellow': 2, 'aqua': 3, 'pink': 4, 'lavender': 5, 'peach': 6, 'seafoam': 7, 'blue': 8, 
    'green': 9, 'purple': 10, 'orange': 11, 'brown': 12, 'fuchsia': 13, 'cyan': 14, 'sandstone': 15, 'darkgreen': 16}; // Label colors
    var colors = [ // Selected colors that we want to use
    colors['red'],
    colors['orange'],
    colors['yellow'],
    colors['green'],
    colors['blue'],
    colors['purple'],
    colors['fuchsia']];
    if (layers != 0) { // If there is layer selection
        for (var i = 0; i < layers.length; i++) { // Iterate through layers
            layers[i].label = colors[i % colors.length]; // Colorise layers
        }
    } else { // If there is no layer selection
        for (var i = 1; i <= comp.layers.length; i++) { // Iterate through layers
            comp.layer(i).label = colors[(i-1) % colors.length]; // Colorise layers
        }
    }
    app.endUndoGroup(); // End undo group
}
ColoriseLayers(); // Run the function