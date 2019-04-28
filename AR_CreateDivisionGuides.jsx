/*
AR_CreateDivisionGuides

Author: Arttu Rautio (aturtur)
Website: http://aturtur.com/
Name-US: AR_CreateDivisionGuides
Description-US: Creates division guides to active composition
Written for Adobe After Effects CC 2019 (Version 16.1.0 Build 208)
*/
//@target aftereffects
function CreateDivisionGuides() {
    app.beginUndoGroup("AR_CreateDivisionGuides"); // Begin undo group
    var comp = app.project.activeItem; // Get active composition
    var width = comp.width; // Composition width in pixels
    var height = comp.height; // Composition height in pixels
    var division = prompt("How many divisions?",2); // How many times comp will be divided
    for (var i = 0; i <= division; i++) {
        var x = (width / division) * i;
        var y = (height / division) * i;
        comp.addGuide(1, x); // Add vertical guide    
        comp.addGuide(0, y); // Add horizontal guide
    }
    app.endUndoGroup(); // End undo group
}
CreateDivisionGuides(); // Run the function