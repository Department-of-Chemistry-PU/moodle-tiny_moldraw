import {getButtonImage} from "editor_tiny/utils";
import {get_string as getString} from "core/str";
import {handleAction} from "./ui";

import {component, startMolDrawButtonName, startMolDrawMenuItemName, icon} from "./common";

// eslint-disable-next-line consistent-return
export const getSetup = async() => {
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
    // eslint-disable-next-line no-alert
    alert("Error setting up plugin:", error);
  }
};
