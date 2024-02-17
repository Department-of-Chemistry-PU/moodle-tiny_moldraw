// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Commands helper for the Moodle tiny_moldraw plugin.
 *
 * @module      tiny_moldraw/commands
 * @copyright   2024 Venkatesan Rangarajan <venkatesanr.che@pondiuni.ac.in>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {
    component,
    startsketchButtonName,
    startsketchMenuItemName,
    icon,
} from './common';
import {SketchEmbed} from './embed';

/**
 * Handle the action for your plugin.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 */
const handleAction = (editor) => {
    // TODO Handle the action.
	const sketchImage = new SketchEmbed(editor);
    sketchImage.displayDialogue();
    window.console.log(editor);
};

/**
 * Get the setup function for the buttons.
 *
 * This is performed in an async function which ultimately returns the registration function as the
 * Tiny.AddOnManager.Add() function does not support async functions.
 *
 * @returns {function} The registration function to call within the Plugin.add function.
 */
export const getSetup = async() => {
	const isImage = (node) => node.nodeName.toLowerCase() === 'img';
    const [
        startsketchButtonNameTitle,
        startsketchMenuItemNameTitle,
        buttonImage,
    ] = await Promise.all([
        getString('button_startsketch', component),
        getString('menuitem_startsketch', component),
        getButtonImage('icon', component),
    ]);

    return (editor) => {
        // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the startsketch Toolbar Button.
        editor.ui.registry.addButton(startsketchButtonName, {
            icon,
            tooltip: startsketchButtonNameTitle,
            onAction: () => handleAction(editor),
/**			
				onSetup: api => {
                return editor.selection.selectorChangedWithUnbind(
                    'img:not([data-mce-object]):not([data-mce-placeholder]),figure.image',
                    api.setActive
                ).unbind;
            }
**/
        });

        // Add the startsketch Menu Item.
        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(startsketchMenuItemName, {
            icon,
            text: startsketchMenuItemNameTitle,
            onAction: () => handleAction(editor),
        });

        editor.ui.registry.addContextToolbar(startsketchButtonName, {
            predicate: isImage,
            items: startsketchButtonName,
            position: 'node',
            scope: 'node'		   						 
        });
    };
};
