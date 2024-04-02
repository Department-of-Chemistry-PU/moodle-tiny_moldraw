document.addEventListener("DOMContentLoaded", function () {
  var actionButton = document.getElementById("actionbutton");
  actionButton.addEventListener("click", closeModal);

  // var isPreview = true;

  // function handleClick() {
  //   var mol = view_canvas.getMolecule();
  //   if (isPreview) {
  //     if (mol === undefined) {
  //       alert("Canvas is Blank");
  //     } else {
  //       console.log("if part run");
  //       this.setAttribute("data-state", "preview");
  //       outputImage();
  //       this.innerHTML = "Confirm & Close";
  //       this.setAttribute("data-state", "confirm");
  //       isPreview = false;
  //     }
  //   } else {
  //     console.log("else part run");
  //     closeModal();
  //   }
  // }

  // function outputImage() {
  //   var mol = sketcher.getMolecule();
  //   var molFile = ChemDoodle.writeMOL(mol);
  //   console.log(molFile);
  //   var src = ChemDoodle.io.png.string(sketcher);
  //   var img = document.createElement("img");
  //   img.src = src;
  //   img.width = prompt("Enter Width: ");
  //   img.height = prompt("Enter Height: ");
  //   var outputDiv = document.getElementById("output");
  //   outputDiv.appendChild(img);
  // }

  function closeModal() {
    if (
      window.parent.tinyMCE &&
      window.parent.tinyMCE.activeEditor
    ) {
      var mol = sketcher_viewer.getMolecule();
      var src = ChemDoodle.io.png.string(sketcher_viewer);
      var molFile = ChemDoodle.writeMOL(mol);
      var width = 400;
      var height = 300;
      var content =
        '<img src="' +
        src +
        '" width="' +
        width +
        'px" height="' +
        height +
        'px">';
      window.parent.tinyMCE.activeEditor.execCommand(
        "mceInsertContent",
        0,
        content
      );
      window.parent.tinyMCE.activeEditor.execCommand(
        "mceInsertContent",
        0,
        "<!--" + molFile + "-->"
      );
      window.parent.document
        .querySelector(".modal")
        .querySelector(".close")
        .click();
    }
  }
});
