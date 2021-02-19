let participants = [];

window.addEventListener("load", () => {
  const urlParticipants = cleanParticipantsList(
    getUrlParam("participants").split(",")
  );

  if (urlParticipants.length) {
    $getEle("#participants").value = urlParticipants.join(",");
  }
});

function createRouletteSlice(sliceName, position, sliceCount) {
  const colorNumber = position + 1 - 3 * Math.floor(position / 3);
  const sliceDegrees = 360 / sliceCount;
  const arcRads = degreesToRad(90 - sliceDegrees);
  const arcEndX =
    CIRCLE_RADIUS + CIRCLE_RADIUS_MINUS_STROKE * Math.cos(arcRads);
  const arcEndY =
    CIRCLE_RADIUS - CIRCLE_RADIUS_MINUS_STROKE * Math.sin(arcRads);

  const $slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
  $slice.classList.add("slice");
  $slice.classList.add(`slice-color-${colorNumber}`);

  // <path d="M center_x center_y L center_x 1 A arc_size_x arc_size_y 0 0 1 arcEndX arcEndY" />
  $slice.setAttribute(
    "d",
    `M ${CIRCLE_RADIUS_PLUS_STROKE} ${CIRCLE_RADIUS}
     L ${CIRCLE_RADIUS_PLUS_STROKE} ${STROKE}
     A ${CIRCLE_RADIUS_MINUS_STROKE} ${CIRCLE_RADIUS_MINUS_STROKE}
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
    `M ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} L ${arcEndX} ${arcEndY} Z`
  );
  $sliceNamePath.style.transform = `rotate(${
    position * sliceDegrees - sliceDegrees / 2 + 2.5
  }deg)`;
  $sliceNamePath.id = position;

  const $text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const $textPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "textPath"
  );

  $textPath.setAttribute("href", "#" + position);
  $textPath.setAttribute("text-anchor", "end");
  $textPath.setAttribute("startOffset", "44%");
  $textPath.innerHTML = sliceName;
  $textPath.classList.add("slice-name-text");
  $text.appendChild($textPath);
  // end of slice name insertion

  return [$slice, $sliceNamePath, $text];
}

function createRoulette(slices) {
  const sliceCount = slices.length;

  if (sliceCount <= 1) {
    alert("The roulette needs to have at least 2 participants!");
    return false;
  }

  const $roulette = $getEle("#roulette-slices");
  const $rouletteNames = $getEle("#roulette-names");
  $roulette.innerHTML = "";
  $rouletteNames.innerHTML = "";

  slices.map((sliceName, position) => {
    slice = createRouletteSlice(sliceName, position, sliceCount);
    $roulette.appendChild(slice[0]);
    $rouletteNames.appendChild(slice[1]);
    $rouletteNames.appendChild(slice[2]);
  });

  return true;
}

function loadRoullette() {
  participants = cleanParticipantsList(
    $getEle("#participants").value.replace(/\n/g, ",").split(",")
  );

  participants.shuffle();

  const created = createRoulette(participants);
  const $rouletteContainer = $getEle("#roulette-container");

  $rouletteContainer.classList.toggle("hidden", !created);

  const $roulette = $getEle("#roulette");
  $roulette.style.transition = "none";
  $roulette.style.transform = "rotate(0deg)";
}

$getEle("#spin").addEventListener("click", () => {
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

    console.log(participants[Math.floor(participants.length * (1 - rand))]);
  }, 40);
});

$getEle("#generate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  loadRoullette();
});

$getEle("#store-entries").addEventListener("click", () => {
  const newParticipantsList = cleanParticipantsList(
    $getEle("#participants").value.replace(/\n/g, ",").split(",")
  );

  setUrlParam("participants", newParticipantsList.join(","));

  copyToClipboard(window.location.href);
});
