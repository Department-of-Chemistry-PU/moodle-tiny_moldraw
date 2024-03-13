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
 * @module      plugintype_pluginname/commands
 * @copyright   2024 Venkatesan Rangarajan <venkatesanrpu@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {
    component,
    startMolDrawButtonName,
    startMolDrawMenuItemName,
    icon,
} from './common';

/**
 * Handle the action for your plugin.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 */
const handleAction = (editor) => {
    editor.windowManager.open({
        title: 'ChemDoodle Window',
        body: {
            type: 'panel',
            items: [
                {
                    type: 'iframe',
                    name: 'chemdoodle',
                    src: '/path/to/chemdoodle/index.html',
                    sandboxed: false
                },
                {
                    type: 'button',
                    name: 'saveButton',
                    text: 'Save Structure',
                    primary: true,
                    align: 'end',
                    disabled: false
                }
            ]
        },
        buttons: [
            {
                type: 'cancel',
                text: 'Close'
            },
            {
                type: 'submit',
                text: 'Save',
                primary: true
            }
        ],
        onSubmit: (api) => {
            // Get the structure data from ChemDoodle.
            // This is just a placeholder, replace it with the actual code to get the data.
            var structureData = api.getData().chemdoodle.getStructureData();

            // Insert the structure data into the TinyMCE editor.
            editor.insertContent(structureData);

            // Close the window.
            api.close();
        },
        width: Math.round(screen.width * 0.4),
        height: Math.round(screen.height * 0.4),
    });
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
    const [
        startMolDrawButtonNameTitle,
        startMolDrawMenuItemNameTitle,
        buttonImage,
    ] = await Promise.all([
        getString('button_startMolDraw', component),
        getString('menuitem_startMolDraw', component),
        getButtonImage('icon', component),
    ]);

    return (editor) => {
        // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the startMolDraw Toolbar Button.
        editor.ui.registry.addButton(startMolDrawButtonName, {
            icon,
            tooltip: startMolDrawButtonNameTitle,
            onAction: () => handleAction(editor),
        });

        // Add the startMolDraw Menu Item.
        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(startMolDrawMenuItemName, {
            icon,
            text: startMolDrawMenuItemNameTitle,
            onAction: () => handleAction(editor),
        });
    };
};
