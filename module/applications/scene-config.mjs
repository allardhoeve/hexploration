/**
 * A class which augments the existing SceneConfig with additional, module-specific options.
 */
export default class SceneConfig {
  /**
   * Add module-specific options to the config.
   * @param {Scene} scene       The Scene Document.
   * @param {HTMLElement} html  The rendered markup.
   */
  static addOptions(scene, html) {
    const fog = html.elements?.["fog.mode"];
    if ( !fog ) return;
    const field = new foundry.data.fields.BooleanField({
      hint: "HEXPLORATION.FIELDS.enabled.hint",
      label: "HEXPLORATION.FIELDS.enabled.label"
    }, { name: "flags.hexploration.enabled" });
    const value = scene.getFlag("hexploration", "enabled") ?? false;
    const group = field.toFormGroup({ localize: true }, { value });
    fog.closest(".form-group").insertAdjacentElement("afterend", group);

    const rangeField = new foundry.data.fields.NumberField({
      hint: game.i18n.localize("HEXPLORATION.FIELDS.range.hint"),
      label: game.i18n.localize("HEXPLORATION.FIELDS.range.label"),
      integer: true,
      min: 0,
      max: 1,
      initial: 0
    }, { name: "flags.hexploration.range" });
    const rangeValue = scene.getFlag("hexploration", "range") ?? 0;
    const rangeGroup = rangeField.toFormGroup({}, { value: rangeValue, type: "number" });
    group.insertAdjacentElement("afterend", rangeGroup);

    const type = html.elements?.["grid.type"];
    type.addEventListener("change", SceneConfig.onChangeGridType);
    group.toggleAttribute("hidden", Number(type?.value) < 2);
  }

  /* -------------------------------------------- */

  /**
   * Handle showing or hiding fields based on grid type.
   * @param {Event} event  The triggering event.
   */
  static onChangeGridType(event) {
    const type = event.currentTarget;
    const hexploration = type.form.elements["flags.hexploration.enabled"].closest(".form-group");
    hexploration.toggleAttribute("hidden", Number(type.value) < 2);
  }

  /* -------------------------------------------- */

  /**
   * SceneConfig render hook.
   * @param {ApplicationV2} app  The original application.
   * @param {HTMLElement} html   The rendered markup.
   */
  static render(app, html) {
    SceneConfig.addOptions(app.document, html);
  }
}
