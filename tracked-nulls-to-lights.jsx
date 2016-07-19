////////////////////////////////////////////////////////////////////////////////////////
// tracked nulls to lights
// https://twitter.com/aturtur
////////////////////////////////////////////////////////////////////////////////////////
// 1. track your footage and assign tracked x,y position data to null object
// 2. select null(s) and run the script
// 3. profit
////////////////////////////////////////////////////////////////////////////////////////
app.beginUndoGroup("Tracked nulls to lights");

var comp = app.project.activeItem;
var layers = comp.selectedLayers;

for (var i = 0; i < layers.length; i++) {
	if (layers[i] instanceof AVLayer) {
			if (layers[i].nullLayer)
			{
				var nullName = layers[i].name;
				var prop = layers[i].transform.position;
				var light = comp.layers.addLight(nullName, [0,0]);
				light.lightType = LightType.POINT;
				var keysVal = Array();
				var keysTim = Array();
				for (var j = 1; j <= prop.numKeys; j++) {
					keysVal[keysVal.length] = prop.keyValue(j);
					keysTim[keysTim.length] = prop.keyTime(j);
				}
				for(var j = 1; j <= keysVal.length; j++){
					light.position.setValueAtTime(keysTim[j-1], keysVal[j-1]);	
				}
				keysVal = Array();
				keysTim = Array();
			} else {
				alert("Select a null!");
			}
	} else {
		alert("Select a layer!");
	}
}
app.endUndoGroup();