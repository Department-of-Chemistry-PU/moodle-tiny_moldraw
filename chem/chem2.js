// ChemDoodle.ELEMENT['H'].jmolColor = 'black';
ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';
// Main ketcher.
const sketcher = new ChemDoodle.SketcherCanvas('sketcher', 600, 350, { useServices: false, requireStartingAtom: false });
// We init the ketcher with an empty molecule object.
sketcher.styles.atoms_displayTerminalCarbonLabels_2D = true;
sketcher.styles.atoms_useJMOLColors = true;
sketcher.styles.bonds_clearOverlaps_2D = true;
sketcher.styles.shapes_color = "#c10000";
sketcher.repaint();


// Preview ketcher.
const sketcher_viewer = new ChemDoodle.ViewerCanvas('sketcher-viewer-atto', 100, 100);
sketcher_viewer.styles.atoms_displayTerminalCarbonLabels_2D = true;
sketcher_viewer.styles.atoms_useJMOLColors = true;
sketcher_viewer.styles.bonds_clearOverlaps_2D = true;
//sketcher_viewer.repaint();
sketcher_viewer.emptyMessage = 'No data loaded';
sketcher.oldFunc = sketcher.checksOnAction;

/*   Refactor the function, in order for the preview ketcher to be a copy of the main ketcher,
     updated at every modification of the main ketcher. */
sketcher.checksOnAction = function (force) {
    this.oldFunc(force);
    //sketcher.repaint();
    let mols = sketcher.molecules;
    let forms = sketcher.shapes;
    sketcher_viewer.loadContent(mols, forms);
    sketcher.center();
    for (let i = 0, ii = this.molecules.length; i < ii; i++) {
        this.molecules[i].check();
    }
}

/*  Button activated function, checks for the values of width and height in the input elements.
    If empty, uses the default value. */

function getWidth (){
    return (document.getElementById('width_input_molstructure').valueAsNumber)
}

function getHeight(){
    return (document.getElementById('height_input_molstructure').valueAsNumber)
}

function function_resize() {
    let input_width = getWidth;
    let input_height = getHeight;
    let width;
    let height;

    if (input_width > 0) {
        width = input_width;
    } else {
        width = 100;
    }
    if (input_height > 0){
        // console.log('inif');
        height = input_height;
    } else {
        // console.log('inelse');
        height = 100;
    }
    sketcher_viewer.resize(width, height);
}
function insert() {
    if (window.parent.tinyMCE && window.parent.tinyMCE.activeEditor) {
        if (typeof sketcher_viewer !== 'undefined') {
            let mol = sketcher_viewer.getMolecule();
            console.log(mol); // Log to console for easier inspection
            let src = ChemDoodle.io.png.string(sketcher_viewer);
            let molFile = ChemDoodle.writeMOL(mol);
            let width = getWidth(); // Assuming getWidth() is a function
            let height = getHeight(); // Assuming getHeight() is a function

            var content =
                '<img src="' +
                src +
                '" width="' +
                width +
                'px" height="' +
                height +
                'px">';

            // Insert image content into the active TinyMCE editor
            window.parent.tinyMCE.activeEditor.execCommand(
                "mceInsertContent",
                0,
                content
            );
            
            // Insert molecule file content into the active TinyMCE editor
            window.parent.tinyMCE.activeEditor.execCommand(
                "mceInsertContent",
                0,
                "<!--" + molFile + "-->"
            );

            // Close the modal
            var modal = window.parent.document.querySelector('.modal');
            var closeButton = modal.querySelector('.close');
            closeButton.click();
        } else {
            console.error("sketcher_viewer is undefined or not accessible.");
        }
    } else {
        console.error("TinyMCE editor not found in parent window.");
    }
    console.log("Button Click");
}
