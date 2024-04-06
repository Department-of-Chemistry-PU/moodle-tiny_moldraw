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
 * Common values helper for the Moodle tiny_keteditor plugin.
 *
 * @module      tiny_keteditor/commands
 * @copyright   2024 Venkatesan Rangarajan <venkatesanrpu@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {component,icon,buttonName,} from './common';
import {KetcherEmbed} from './embed';

/**
 * Handle the action for your plugin.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 */

const handleAction = (editor) => {
    const ketcherImage = new KetcherEmbed(editor);
    ketcherImage.init();
	
	// Get the ketcher instance from the global scope
    var ketcher = window.ketcher;

    // Add an event listener for the 'actionButton' click event
    $("#actionButton").click(function() {
        handleAction(ketcher);
    });
};

    async function handleAction(ketcher) {
    var struct = await ketcher.getKet();
    var image = await ketcher.generateImage(struct, {
        outputFormat: "svg",
        backgroundColor: "255, 255, 255"
    });
    // Create a new FileReader instance
    var reader = new FileReader();
    // Add an event listener for the 'load' event
    reader.addEventListener('load', function() {
        // The result attribute contains the data as a Base64 encoded string
        var base64Image = reader.result;
        // Parse the SVG to get the width and height
        var parser = new DOMParser();
        var svgDoc = parser.parseFromString(atob(base64Image.split(',')[1]), "image/svg+xml");
        var svgElement = svgDoc.documentElement;
        var width = svgElement.getAttribute("width");
        var height = svgElement.getAttribute("height");
        if (window.parent.tinyMCE && window.parent.tinyMCE.activeEditor) {
            var url = URL.createObjectURL(image);
            var ketString = JSON.stringify(struct);
            var ketStruct = ketString.replace(/\\n/g, '').replace(/\\"/g, '"').replace(/ /g, '').slice(1, -1);
            var content = '<img src="' + url + '" width="' + width + '" height="' + height + '">';		
            window.parent.tinyMCE.activeEditor.execCommand('mceInsertContent', 0, content);
            window.parent.tinyMCE.activeEditor.execCommand('mceInsertContent', 0, '<!--' + ketStruct + '-->');
        } else {
            console.log('TinyMCE not initialized');
        }
        $(window.parent.document).find(".modal").find('.close').click();
    });
    // Start reading the Blob as a Base64 encoded string
    reader.readAsDataURL(image);
};

export const getSetup = async() => {
    const isImage = (node) => node.nodeName.toLowerCase() === 'img';

    const [
        buttonNameTitle,
        buttonImage,
		icon,
    ] = await Promise.all([
                getString('buttonNameTitle', component),
                getButtonImage('icon', component),
            ]);

    return (editor) => {
        // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the startdemo Toolbar Button.
        editor.ui.registry.addButton(ketcherButtonName, {
            icon,
            tooltip: ketcherButtonNameTitle,
            onAction: () => handleAction(editor),
        });

        editor.ui.registry.addToggleButton(ketcherButtonName, {
            icon,
            tooltip: ketcherButtonNameTitle,
            onAction: () => handleAction(editor, window.json),
            onSetup: api => {
                return editor.selection.selectorChangedWithUnbind(
                    'img:not([data-mce-object]):not([data-mce-placeholder]),figure.image',
                    function () {
                    var node = editor.selection.getNode();
                    var parentNode = node.parentNode;
                    const html = editor.serializer.serialize(parentNode);
                    const commentMatch = html.match(/<!--(.*?)-->/);
                    if (commentMatch) {
                        try {
                            var json = JSON.parse(commentMatch[1]);
                            // If the comment contains valid JSON, call api.setActive and store the JSON
                            api.setActive(true);
                            window.json = JSON.stringify(json); // Save the JSON to window.json
                        } catch (e) {
                            // If the comment does not contain valid JSON, call api.setActive with false
                            api.setActive(false);
                        }
                    } else {
                        api.setActive(false);
                    }
                }).unbind;
            }
        });

        editor.ui.registry.addContextToolbar(ketcherButtonName, {
            predicate: isImage,
            items: ketcherButtonName,
            position: 'node',
            scope: 'node'
        });

        // Add the startdemo Menu Item.
        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(ketcherButtonName, {
            icon,
            text: ketcherButtonNameTitle,
            onAction: () => handleAction(editor),
        });

    };
};
