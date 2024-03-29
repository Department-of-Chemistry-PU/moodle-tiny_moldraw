// This file is part of Moodle - http://moodle.org/
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
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny Sketch plugin Embed class for Moodle.
 *
 * @module      tiny_moldraw/embed
 * @copyright   2024 Venkatesan Rangarajan <venkatesanr.che@pondiuni.edu.in>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';
import * as ModalEvents from 'core/modal_events';
import Templates from 'core/templates';
import Modal from 'core/modal';
import Config from 'core/config';
import component from './common';

export const SketchEmbed = class {
    editor = null;
    canShowFilePicker = false;

    /**
     * @property {Object} The names of the alignment options.
     */
    helpStrings = null;

    /**
     * @property {boolean} Indicate that the user is updating the media or not.
     */
    isUpdating = false;

    constructor(editor) {
        this.editor = editor;
    }

    async displayDialogue() {
        Modal.create({
            title: getString('sketchtitle', 'component'),
            body: Templates.render('tiny_moldraw/sketch_iframe', {
                src: this.getIframeURL()
            })
        }).then(modal => {
            modal.getRoot().on(ModalEvents.hidden, () => {
                modal.destroy();
            });
            modal.show();
            document.querySelector('.modal-dialog').style.cssText = "max-width: unset;width:100%;height:100vh;margin:0;padding:0;";
            document.querySelector('.modal-content').style.cssText = "max-height: unset;height:100vh;";
            document.querySelector('.modal-body').style.cssText = "padding:0";
            return modal;
        }).catch();
    }

    getIframeURL = () => {
        const url = new URL(`${Config.wwwroot}/lib/editor/tiny/plugins/moldraw/ketcher/sketch.html`);
        return url.toString();
    };
};
