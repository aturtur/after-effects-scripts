/*
AR_RollingNumbers
Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_RollingNumbers
Description-US: This script creates a rolling number setup with separated digits.
Written for Adobe After Effects CC 2019 (Version 16.1.2 Build 55)
*/
//@target aftereffects
function RollingNumbers() {
    app.beginUndoGroup("AR_RollingNumbers"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var layers = comp.selectedLayers // Get selected layers
    var digits = parseInt(prompt("How many digits? (Maximum is 6)", 4)); // User input: How many digits?
    textLayerCount = digits; // Count of digits
    var layerArray = []; // Init an array for storing layers
    for (var i = 0; i < textLayerCount; i++) { // Iterate through digits
        layerArray[i] = comp.layers.addText(); // Create a text layer
    }

    var controller = comp.layers.addNull(0); // Add a controller null
    var name = "Rolling Number Controller"; // Give a name
    controller.name = name; // Set null's name
    controller.Effects.addProperty("ADBE Slider Control"); // Add a Slider Control effect
    var leadingZeros = controller.Effects.addProperty("ADBE Checkbox Control") // Add a Checkbox Control effect
    leadingZeros.name = "Leading Zeros"; // Set name for the Checkbox Control    
    var iterator_a = 0; // Init iterator a varaible
    for (var i = 0; i < layerArray.length; i++) {
        layerArray[i].name = "Rolling Number "+i; // Set a text layer's name
        layerArray[i].property("ADBE Transform Group").property("ADBE Position").setValue([layerArray[i].property("ADBE Transform Group").property("ADBE Position").value[0]+(50*i),
                                                                                                                          layerArray[i].property("ADBE Transform Group").property("ADBE Position").value[1]]);
        if (i == 0) { // If first iteration
            layerArray[i].property("ADBE Text Properties").property("ADBE Text Document").expression = "v = Math.round(thisComp.layer(\""+name+"\").effect(\"Slider Control\")(\"Slider\").value).toString();\n"+
                                                                                                        "len = v.length;\n"+
                                                                                                        "lz = thisComp.layer(\""+name+"\").effect(\"Leading Zeros\")(\"Checkbox\").value;\n"+
                                                                                                        "if (lz == true) {s = \"0\"} else {s = \"\"};\n"+
                                                                                                        "if (len == "+layerArray.length+") {\n"+
                                                                                                        "    s = v.substring(0, 1);\n"+
                                                                                                        "}\n"+
                                                                                                        "s";
        } else if (i > 0) { // If not a first iteration
            var elifString = ""; // Init a string for storing expression stuff
            var iterator_b = 1; // Init iterator b varaible
            for (var j = 0; j < i; j++) {
                var low = ((layerArray.length-1)+(iterator_b-iterator_a));
                addToString = "} else if (len == "+low+") {\n"+
                                      "    s = v.substring("+iterator_b+","+(iterator_b+1)+");\n";
                elifString = elifString + addToString;
                iterator_b++;
            }            
            var sub = (layerArray.length - i);
            layerArray[i].property("ADBE Text Properties").property("ADBE Text Document").expression = "v = Math.round(thisComp.layer(\""+name+"\").effect(\"Slider Control\")(\"Slider\").value).toString();\n"+
                                                                                                        "len = v.length;\n"+
                                                                                                        "lz = thisComp.layer(\""+name+"\").effect(\"Leading Zeros\")(\"Checkbox\").value;\n"+
                                                                                                        "if (lz == true) {s = \"0\"} else {s = \"\"};\n"+
                                                                                                        "if (len == "+sub+") {\n"+
                                                                                                        "    s = v.substring(0, 1);\n"+
                                                                                                        elifString+
                                                                                                        "}\n"+
                                                                                                        "s";
            iterator_a++;
        }
    }
    app.endUndoGroup(); // End undo group
}

RollingNumbers(); // Run the script