import { getButtonImage } from "editor_tiny/utils";
import { get_string as getString } from "core/str";
import Modal from "core/modal";
import { component, startMolDrawButtonName, startMolDrawMenuItemName, icon } from "./common";
import { loadBody, loadFooter } from "./body";

const handleAction = async() => {
  try {
    const title = await getString("sketchtitle", "tiny_moldraw");
    const bodyContent = await loadBody();
    const footerContent = await loadFooter();

    await Modal.create({
      title: title,
      body: bodyContent,
      footer: footerContent,
      show: true,
      removeOnClose: true,
    });

    const modalWidth = 850;
    const modalHeight = 600;
    const screenHeight = window.innerHeight;
    const topPosition = (screenHeight - modalHeight) / 2;
    document.querySelector(".modal-dialog").style.cssText =
      `max-width: unset; width: ${modalWidth}px; height: ${modalHeight}px; margin: ${topPosition}px auto; padding: 0;`;
    document.querySelector(".modal-content").style.cssText =
      "max-height: 600px; height: 100vh;";
    document.querySelector(".modal-body").style.cssText = "padding: 0;";
  } catch (error) {
    console.error("Error handling action:", error);
  }
};

export const getSetup = async () => {
  try {
    const [startMolDrawButtonNameTitle, startMolDrawMenuItemNameTitle, buttonImage] = await Promise.all([
      getString("button_startMolDraw", component),
      getString("menuitem_startMolDraw", component),
      getButtonImage("icon", component),
    ]);

    return (editor) => {
      editor.ui.registry.addIcon(icon, buttonImage.html);

      editor.ui.registry.addButton(startMolDrawButtonName, {
        icon,
        tooltip: startMolDrawButtonNameTitle,
        onAction: () => handleAction(editor),
      });

      editor.ui.registry.addMenuItem(startMolDrawMenuItemName, {
        icon,
        text: startMolDrawMenuItemNameTitle,
        onAction: () => handleAction(editor),
      });
    };
  } catch (error) {
    console.error("Error setting up plugin:", error);
  }
};
