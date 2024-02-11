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
 * Tiny moldraw plugin Embed class for Moodle.
 *
 * @module      tiny_moldraw/embed
 * @copyright   2024 Venkatesan Rangarajan  <venkatesanrpu@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {get_string as getString} from 'core/str';
import Config from 'core/config';
import * as Modal from 'core/modal';
import * as ModalEvents from 'core/modal_events';
import * as Ajax from 'core/ajax';
import Templates from 'core/templates';

function($, Modal, ModalEvents, Ajax, Templates) {
	var trigger = $('#your_trigger_element_id'); // The element that triggers the modal to open.
		Modal.create({
		type: Modal.types.SAVE_CANCEL,
		title: 'Ketcher Editor',
		body: '<iframe src="../../ketcher/sketch.html" width="800" height="600"></iframe>', // Replace with the path to your Ketcher HTML file.
		}, 
		trigger)
		.done(function(modal) {
		// You can catch modal events here.
			modal.getRoot().on(ModalEvents.save, function(e) {
			// Prevent the default save behavior.
			e.preventDefault();
			// Here you can add your save logic.
			});
		});
});
