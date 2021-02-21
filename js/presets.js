function presetButtonOnClick(presetOptions) {
  $getEle("#entries").value = presetOptions.join(", ");
  loadRoullette();
}

function createPresetButton(buttonText, presetOptions) {
  const $button = document.createElement("button");

  $button.innerHTML = buttonText;
  $button.classList.add("preset-button");
  $button.addEventListener("click", () => presetButtonOnClick(presetOptions));

  return $button;
}

window.addEventListener("load", () => {
  const $presetButtonsWrapper = $getEle("#preset-buttons");

  if (typeof PRESETS === "undefined" || PRESETS.length === 0) {
    $getEle("#presets").remove();
    return;
  }

  PRESETS.map((preset) => {
    const $presetButton = createPresetButton(
      preset.buttonText,
      preset.presetOptions
    );
    $presetButtonsWrapper.appendChild($presetButton);
  });
});
