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
 * @copyright   2024 Venkatesan Rangarajan <venkatesanrpu@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import Templates from 'core/templates';
import * as Modal from 'core/modal_factory';
import Config from 'core/config';
import {
    component,
    startMolDrawButtonName,
    startMolDrawMenuItemName,
    icon,
} from './common';

const handleAction = async (editor) => {
    const modal = await Modal.create({
        type: Modal.types.DEFAULT,
        title: await getString('sketchtitle', 'tiny_moldraw'),
        body: await Templates.render('tiny_moldraw/moldraw_iframe', {
            src: `${Config.wwwroot}/lib/editor/tiny/plugins/moldraw/ketcher/index.html`
        }),
        show: true,
        removeOnClose: true,
    });

    document.querySelector('.modal-dialog').style.cssText = "max-width: unset;width:75%;height:75vh;margin:0;padding:0;";
    document.querySelector('.modal-content').style.cssText = "max-height: unset;height:100vh;";
    document.querySelector('.modal-body').style.cssText = "padding:0";
    window.console.log(editor);

    // Add your button actions here
    var isPreview = true;

    async function handleClick() {
      if (isPreview) {
        $(this).attr('data-state', 'preview');
        await outputImage();
        $(this).html("Confirm & Close").attr('data-state', 'confirm');
        isPreview = false;
      } else {
        closeModal();
      }
    }
    $("#width, #height").on('input', outputImage);
    $("#actionButton").click(handleClick);

    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    function outputImage() {
      var output = $('#output');
      var width = $('#width').val();
      var height = $('#height').val();
      ketcher.getKet().then(struct => ketcher.generateImage(struct, {
        outputFormat: "svg",
        backgroundColor: "255, 255, 255"
      })).then(blob => blobToBase64(blob)).then(base64 => {
        var img = $('<img>').attr('src', base64).attr('width', width).attr('height', height);
        output.html('').append(img);
      }).catch(error => window.alert(error));
    }

    function getData() {
      return new Promise((resolve, reject) => {
        ketcher.getKet().then(struct => {
          ketcher.generateImage(struct, {
            outputFormat: "svg",
            backgroundColor: "255, 255, 255",
          }).then(blob => blobToBase64(blob)).then(base64 => {
            resolve({
              dataURI: base64,
              ketData: struct,
            });
          }).catch(reject);
        }).catch(reject);
      });
    }

    window.getData = getData;

    function closeModal() {
      var width = $('#width');
      var height = $('#height');
      getData().then(({ dataURI, ketData }) => {
        if (window.parent.tinyMCE && window.parent.tinyMCE.activeEditor) {
          var content = '<img src="' + dataURI + '" width="' + width.val() + 'px" height="' + height.val() + 'px">';
          window.parent.tinyMCE.activeEditor.execCommand('mceInsertContent', 0, content);
          window.parent.tinyMCE.activeEditor.execCommand('mceInsertContent', 0, '<!--'+ketData+'-->');
        } else {
          console.log('TinyMCE not initialized');
        }
        $(window.parent.document).find(".modal").find('.close').click();
      }).catch(error => {
        console.error('ERROR IN GETDATA', error);
        alert(error);
      });
    }
};

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
};
