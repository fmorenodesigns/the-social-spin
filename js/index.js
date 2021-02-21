let entries = [];

window.addEventListener("load", () => {
  let urlEntries = getUrlParam("entries") || "";
  urlEntries = cleanEntriesList(urlEntries.split(","));

  if (urlEntries.length) {
    $getEle("#entries").value = urlEntries.join(",");
  }

  // Sets the --roulette-diameter which defines the size of the roulette size delimiter
  // NB: Not the diameter of the roulette itself. That's defined by the roulette's viewBox
  document.documentElement.style.setProperty(
    "--roulette-diameter",
    `${CIRCLE_RADIUS * 2 + 40}px`
  );
});

function createRouletteSlice(sliceName, position, sliceCount) {
  const colorNumber =
    // If it's the last slice and the rest of the division of the amount of slices per
    // 3 (the amount of different colors) is 1, then pick the second color. This is to
    // avoid the first and the last slices having the same color.
    position === sliceCount - 1 && sliceCount % 3 === 1
      ? 2
      : position + 1 - 3 * Math.floor(position / 3);
  const sliceDegrees = 360 / sliceCount;
  const arcRads = degreesToRad(90 - sliceDegrees);
  const arcEndX = CIRCLE_RADIUS + (CIRCLE_RADIUS - STROKE) * Math.cos(arcRads);
  const arcEndY = CIRCLE_RADIUS - (CIRCLE_RADIUS - STROKE) * Math.sin(arcRads);

  const $slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
  $slice.classList.add("slice");
  $slice.classList.add(`slice-color-${colorNumber}`);

  // <path d="M center_x center_y L center_x 1 A arc_size_x arc_size_y 0 0 1 arcEndX arcEndY" />
  $slice.setAttribute(
    "d",
    `M ${CIRCLE_RADIUS + STROKE},${CIRCLE_RADIUS}
     L ${CIRCLE_RADIUS + STROKE},${STROKE}
     A ${CIRCLE_RADIUS - STROKE},${CIRCLE_RADIUS - STROKE}
     0 0 1 ${arcEndX} ${arcEndY}`
  );
  $slice.style.transform = `rotate(${position * sliceDegrees}deg)`;

  // Insert name in the slice
  const $sliceNamePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  $sliceNamePath.classList.add("slice-name");

  $sliceNamePath.setAttribute(
    "d",
    `M ${CIRCLE_RADIUS},${CIRCLE_RADIUS} L ${arcEndX},${arcEndY} Z`
  );
  $sliceNamePath.style.transform = `rotate(${
    position * sliceDegrees - sliceDegrees / 2 + 2.5
  }deg)`;
  const sliceNameId = `slice-${position}`;
  $sliceNamePath.id = sliceNameId;

  const $text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  $text.setAttribute("text-anchor", "end");

  const $textPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "textPath"
  );
  $textPath.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `#${sliceNameId}`
  );
  $textPath.setAttribute("startOffset", "44%");
  $textPath.innerHTML = sliceName;
  $textPath.classList.add("slice-name-text");
  $text.appendChild($textPath);
  // End of slice name insertion

  return [$slice, $sliceNamePath, $text];
}

function createRoulette(slices) {
  const sliceCount = slices.length;

  if (sliceCount <= 1) {
    alert("The roulette needs to have at least 2 entries!");
    return false;
  }

  const $rouletteSlices = $getEle("#roulette-slices");
  const $rouletteNames = $getEle("#roulette-names");
  $rouletteSlices.innerHTML = "";
  $rouletteNames.innerHTML = "";

  // Set the roulette viewBox
  $rouletteSlices.setAttribute(
    "viewBox",
    `0 0 ${CIRCLE_RADIUS * 2} ${CIRCLE_RADIUS * 2}`
  );
  $rouletteNames.setAttribute(
    "viewBox",
    `0 0 ${CIRCLE_RADIUS * 2} ${CIRCLE_RADIUS * 2}`
  );

  slices.map((sliceName, position) => {
    slice = createRouletteSlice(sliceName, position, sliceCount);
    $rouletteSlices.appendChild(slice[0]);
    $rouletteNames.appendChild(slice[1]);
    $rouletteNames.appendChild(slice[2]);
  });

  return true;
}

function loadRoullette() {
  entries = cleanEntriesList(
    $getEle("#entries").value.replace(/\n/g, ",").split(",")
  );

  entries.shuffle();

  const created = createRoulette(entries);
  const $rouletteContainer = $getEle("#roulette-container");

  $rouletteContainer.classList.toggle("hidden", !created);

  const $roulette = $getEle("#roulette");
  $roulette.style.transition = "none";
  $roulette.style.transform = "rotate(0deg)";

  // Scroll to the roulette
  window.scrollTo({
    top: $rouletteContainer.offsetTop - 60,
    behavior: "smooth",
  });
}

var isSpinning = false;
$getEle("#spin").addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  const $roulette = $getEle("#roulette");

  $roulette.style.transition = "none";
  $roulette.style.transform = `rotate(0deg)`;

  setTimeout(() => {
    const rand = Math.random();
    const completeRounds =
      Math.round(randomNumber(MIN_SPIN_ROUNDS, MAX_SPIN_ROUNDS)) + rand;
    const animationDuration = randomNumber(
      MIN_SPIN_ROUNDS / 3,
      MAX_SPIN_ROUNDS / 3
    );

    // finalCoil > 1 makes the animation spin past the chosen entry, and then spin
    // back to it, for extra funky effect
    const finalCoil =
      Math.random() <= 0.7 ? randomNumber(0.95, 1) : randomNumber(1, 1.3);
    $roulette.style.transition = `transform ${animationDuration}s cubic-bezier(0.35,-0.15, 0, ${finalCoil})`;
    $roulette.style.transform = `rotate(${completeRounds * 360}deg)`;

    const winningEntry = entries[Math.floor(entries.length * (1 - rand))];

    setTimeout(() => {
      console.log(winningEntry);
      isSpinning = false;
    }, animationDuration * 1000);
  }, 40);
});

$getEle("#generate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  loadRoullette();
});

$getEle("#store-entries").addEventListener("click", (e) => {
  $button = e.target;
  const newEntriesList = cleanEntriesList(
    $getEle("#entries").value.replace(/\n/g, ",").split(",")
  );

  setUrlParam("entries", newEntriesList.join(","));

  copyToClipboard(window.location.href);

  $button.setAttribute("tooltip", "Link copied to clipboard");
  setTimeout(() => {
    $button.removeAttribute("tooltip");
  }, 2000);
});

$getAllEle(".preset-button").forEach(($button) => {
  $button.addEventListener("click", () => {
    $getEle("#entries").value = $button.dataset.preset;
    loadRoullette();
  });
});

loadRoullette();
