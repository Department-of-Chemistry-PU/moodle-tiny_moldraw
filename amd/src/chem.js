$(document).ready(function () {
  $("#actionbutton").click(handleClick);

  isPreview = true;
  function handleClick() {
    let mol = sketcher.getMolecule();
    if (isPreview) {
      if (mol === undefined) {
        alert("Canvas is Blank");
      } else {
        console.log("if part run");
        $(this).attr("data-state", "preview");
        outputImage();
        $(this).html("Confirm & Close").attr("data-state", "confirm");
        isPreview = false;
      }
    } else {
      console.log("else part run");
      closeModal();
    }
  }

  //   function handleClick() {
  //     outputImage();

  //   }

  function outputImage() {
    let mol = sketcher.getMolecule();

    let molFile = ChemDoodle.writeMOL(mol);
    //   console.log(molFile);
    src = ChemDoodle.io.png.string(sketcher);

    let img = document.createElement("img");
    img.src = src;
    img.width = prompt("Enter Width: ");
    img.height = prompt("Enter Height: ");
    var outputDiv = document.getElementById("output");
    outputDiv.appendChild(img);
  }

  function closeModal() {
    if (window.parent.tinyMCE && window.parent.tinyMCE.activeEditor) {
      if (true) {
        let mol = sketcher.getMolecule();
        let src = ChemDoodle.io.png.string(sketcher);
        let molFile = ChemDoodle.writeMOL(mol);

        let width = prompt("width:");
        let height = prompt("height:");

        var content =
          '<img src="' +
          src +
          '" width="' +
          width +
          'px" height="' +
          height +
          'px">';
        console.log(molFile, content, width, height);

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
      } else {
        console.log("TinyMCE not initialized");
      }
      $(window.parent.document).find(".modal").find(".close").click();
    }
  }
});
