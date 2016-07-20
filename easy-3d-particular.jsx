var comp = app.project.activeItem;
var cW = comp.width;
var cH = comp.height;
var w = comp.width / 2;
var h = comp.height / 2;

// create ground grid layer
var gridLayer = comp.layers.addSolid([0,0,0], "Easy_Grid", cW, cH, 1);
gridLayer.name = "Ground Grid";
gridLayer.guideLayer = true;
gridLayer.threeDLayer = true;
gridLayer.property("Position").dimensionsSeparated = true;
gridLayer.property("ADBE Material Options Group").property("ADBE Accepts Shadows").setValue(false);
gridLayer.property("ADBE Material Options Group").property("ADBE Accepts Lights").setValue(false);
gridLayer.property("ADBE Transform Group").property("ADBE Rotate X").setValue(90);
gridLayer.property("ADBE Transform Group").property("ADBE Position_1").setValue(cH);
gridLayer.Effects.addProperty("ADBE Grid");

// create camera control null
var theNull = comp.layers.addNull(0);
theNull.name = "Camera Controller";
theNull.threeDLayer = true;

// create camera
var newCamera = comp.layers.addCamera("3D Camera",[w,h]);
newCamera.position.setValue([w,h,-5000]);
newCamera.parent = theNull;

// create light
var light = comp.layers.addLight("Controller", [w,h]);
light.lightType = LightType.SPOT;
light.property("Position").dimensionsSeparated = true;
light.property("ADBE Light Options Group").property("ADBE Light Cone Angle").setValue(0);
light.property("ADBE Transform Group").property("ADBE Anchor Point").expression = "[transform.xPosition,transform.yPosition,transform.zPosition];";
light.property("ADBE Transform Group").property("ADBE Position_0").setValue(w);
light.property("ADBE Transform Group").property("ADBE Position_1").setValue(h);
light.property("ADBE Transform Group").property("ADBE Position_2").setValue(0);

// create particular layer
var particular = comp.layers.addSolid([0,0,0], "Easy_Particular", cW,cH, 1);
particular.Effects.addProperty("tc Particular");

particular.property("ADBE Effect Parade").property("tc Particular").property("tc Particular-0003").expression = "[thisComp.layer(\"Controller\").transform.xPosition,thisComp.layer(\"Controller\").transform.yPosition]";
particular.property("ADBE Effect Parade").property("tc Particular").property("tc Particular-0004").expression = "thisComp.layer(\"Controller\").transform.zPosition";
particular.property("ADBE Effect Parade").property("tc Particular").property("tc Particular-0112").expression = "thisComp.layer(\"Controller\").transform.xRotation";
particular.property("ADBE Effect Parade").property("tc Particular").property("tc Particular-0111").expression = "thisComp.layer(\"Controller\").transform.yRotation";
particular.property("ADBE Effect Parade").property("tc Particular").property("tc Particular-0076").expression = "thisComp.layer(\"Controller\").transform.zRotation";
particular.property("ADBE Effect Parade").property("tc Particular").property("tc Particular-0113").setValue(2);