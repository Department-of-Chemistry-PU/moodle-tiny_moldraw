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
 * @module      tiny_keteditor/embed
 * @copyright   2024 Venkatesan Rangarajan <venkatesanrpu@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';
import Templates from 'core/templates';
import Modal from 'core/modal';
import Config from 'core/config';
import {exception as displayException} from 'core/notification';

export const KetcherEmbed = class {
    editor = null;
    constructor(editor) {
        this.editor = editor;
    }
    init = async() => {
        const modal = await Modal.create({
            title: getString('buttonNameTitle', 'tiny_keteditor'),
            show: true,
            removeOnClose: true,
        });
        Templates.renderForPromise('tiny_keteditor/ketcher_template',{})
        .then(({
                html,
                js
            }) => {
            Templates.appendNodeContents(modal.getBody(), html, js);
const scripturl = new URL(`${Config.wwwroot}/lib/editor/tiny/plugins/keteditor/ketcher/static/js/main.963f80c2.js`);
var script = document.createElement('script');
script.src = scripturl.toString();
document.body.appendChild(script); // Append the script to the body
const sketchurl = new URL(`${Config.wwwroot}/lib/editor/tiny/plugins/keteditor/ketcher/sketch.js`);
var script = document.createElement('script');
script.src = sketchurl.toString();
var button = document.createElement('button');
button.id = "actionButton";
button.className = "btn btn-primary";
button.textContent = "Save";
document.body.appendChild(button, script);
const cssurl = new URL(`${Config.wwwroot}/lib/editor/tiny/plugins/keteditor/ketcher/static/css/main.3fc9c0f8.css`);
var link = document.createElement('link');
link.href = cssurl.toString();
link.rel = 'stylesheet';
document.head.appendChild(link); // Append the link to the head
        })
        .catch((error) => displayException(error));
    };
};
