/*
AR_PixelateAdjustmentLayer

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_PixelateAdjustmentLayer
Description-US: Creates a pixelate adjustment layer that makes 8-bit look
Written for Adobe After Effects CC 2019 (Version 16.0.1 Build 48)
*/
//@target aftereffects
function PixelateAdjustmentLayer() {
    app.beginUndoGroup("pixelate"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var pixelate = comp.layers.addSolid([0,0,0], "Pixelate", comp.width, comp.height, comp.pixelAspect, comp.duration); // Make a solid layer
    pixelate.adjustmentLayer = 1; // Set to adjustment layer
    var slider = pixelate.Effects.addProperty("ADBE Slider Control"); // Add 'Slider Control' effect
    var mosaic = pixelate.Effects.addProperty("ADBE Mosaic"); // Add 'Mosaic' effect
    var posterize = pixelate.Effects.addProperty("ADBE Posterize"); // Add 'Posterize' effect
    // Set stuff...
    pixelate.property("ADBE Effect Parade").property("ADBE Slider Control").name = "Pixel Size";
    pixelate.property("ADBE Effect Parade").property("ADBE Slider Control").property("ADBE Slider Control-0001").setValue(10);
    pixelate.property("ADBE Effect Parade").property("ADBE Mosaic").property("ADBE Mosaic-0001").expression = "thisComp.width/effect('Pixel Size')('Slider')";
    pixelate.property("ADBE Effect Parade").property("ADBE Mosaic").property("ADBE Mosaic-0002").expression = "thisComp.height/effect('Pixel Size')('Slider')";
    pixelate.property("ADBE Effect Parade").property("ADBE Mosaic").property("ADBE Mosaic-0003").setValue(1);
    pixelate.property("ADBE Effect Parade").property("ADBE Posterize").property("ADBE Posterize-0001").setValue(32);
    app.endUndoGroup(); // End undo group
}
PixelateAdjustmentLayer(); // Run the function