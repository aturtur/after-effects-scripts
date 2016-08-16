var comp = app.project.activeItem;

var width = comp.width;
var height = comp.height;
var pa = comp.pixelAspect;
var length = comp.duration;

// make a solid
var pixelate = comp.layers.addSolid([0,0,0], "Pixelate", width, height, pa, length);
pixelate.adjustmentLayer = 1;

// add effects
var slider = pixelate.Effects.addProperty("ADBE Slider Control");
var mosaic = pixelate.Effects.addProperty("ADBE Mosaic");
var posterize = pixelate.Effects.addProperty("ADBE Posterize");

// configure
pixelate.property("ADBE Effect Parade").property("ADBE Slider Control").name = "Pixel Size";
pixelate.property("ADBE Effect Parade").property("ADBE Slider Control").property("ADBE Slider Control-0001").setValue(10);
pixelate.property("ADBE Effect Parade").property("ADBE Mosaic").property("ADBE Mosaic-0001").expression = "thisComp.width/effect('Pixel Size')('Slider')";
pixelate.property("ADBE Effect Parade").property("ADBE Mosaic").property("ADBE Mosaic-0002").expression = "thisComp.height/effect('Pixel Size')('Slider')";
pixelate.property("ADBE Effect Parade").property("ADBE Mosaic").property("ADBE Mosaic-0003").setValue(1);
pixelate.property("ADBE Effect Parade").property("ADBE Posterize").property("ADBE Posterize-0001").setValue(32);