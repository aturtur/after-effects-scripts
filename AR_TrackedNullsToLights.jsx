/*
AR_TrackedNullsToLights

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_TrackedNullsToLights
Description-US: Creates light(s) from selected nulls that are tracked (copies position keys)
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
app.beginUndoGroup("AR_ConvertNullsToLights"); // Begin undo group
var comp = app.project.activeItem; // Get active composition
var layers = comp.selectedLayers; // Get selected layers

for (var i = 0; i < layers.length; i++) { // Loop through selected layers
    if (layers[i] instanceof AVLayer) { // If layer is instance of AVLayer
            if (layers[i].nullLayer) // If null layer
            {
                var name = layers[i].name; // Get layer name
                var prop = layers[i].transform.position; // Get position property
                var light = comp.layers.addLight(name, [0,0]); // Add light to composition
                light.lightType = LightType.POINT; // Set light to point light
                var keysVal = Array(); // Initialize array for storing key values
                var keysTim = Array(); // Initialize array for storing key times
                for (var j = 1; j <= prop.numKeys; j++) { // Iterate through position keys
                    keysVal[keysVal.length] = prop.keyValue(j); // Get key value and add it to array
                    keysTim[keysTim.length] = prop.keyTime(j); // Get key time and add it to array
                }
                for (var j = 1; j <= keysVal.length; j++) { // Iterate through keys
                    light.position.setValueAtTime(keysTim[j-1], keysVal[j-1]); // Set keyframes
                }
                keysVal = Array(); // Empty array
                keysTim = Array(); // Empty array
            } else { // If not null layer
                alert("Select a null!"); // Alert
            }
    } else { alert("Select a null!"); } // If correct type of layer is not selected, alert
}
app.endUndoGroup(); // End undo group