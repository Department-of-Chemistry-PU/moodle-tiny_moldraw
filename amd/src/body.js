/**
 * Tiny tiny_moldraw for Moodle.
 *
 * @module      tiny_moldraw/plugin
 * @copyright   2024 Venkatesan Rangarajan <venkatesanrpu@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
export function loadBody() {
  return new Promise((resolve, reject) => {
      try {
          const bodyContent = `<div class="wrapper" style="text-align: center">

              <div class="drawing_canvas-container">
              <canvas id="sketcher"></canvas><br><br>
              </div>

              <div class="inputs_size">
              <div class="input_width">
                  <label id="label_width_input_molstructure" for="width_input_molstructure">Width: </label>
                  <input type="number" id="width_input_molstructure" name="width" max="500" min="10" step="5" placeholder="100">
                  <br><br>
              </div>

              <div class="input_height">
                  <label id="label_height_input_molstructure" for="height_input_molstructure">Height: </label>
                  <input type="number" id="height_input_molstructure" name="height" max="500" min="10" step="5"
                  placeholder="100"><br><br>
              </div>

              </div>

              <div class="button_size">
              <button id="button-size-button" onclick="function_resize()">Resize</button><br><br>
              </div>

              <div class="viewer_canvas-container">
              <canvas id="sketcher-viewer-atto"></canvas>
              </div>

          </div>
          <button id=" insert" onclick="insert()">Insert</button>
          <script src="http://localhost/lib/editor/tiny/plugins/moldraw/chem/app.js"></script>`;
          resolve(bodyContent);
      } catch (error) {
          reject(error);
      }
  });
}

/**
 *
 */
export function loadFooter() {
  return new Promise((resolve, reject) => {
      try {
          const footerContent = `<p>Example body content</p>
          <button id="actionbutton" class="actionbutton">Insert</button>`;
          resolve(footerContent);
      } catch (error) {
          reject(error);
      }
  });
}
