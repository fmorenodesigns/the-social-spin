const $getEle = document.querySelector.bind(document);
const $getAllEle = document.querySelectorAll.bind(document);

const STROKE = 2;
const CIRCLE_RADIUS = 300;
const CIRCLE_RADIUS_PLUS_STROKE = CIRCLE_RADIUS + STROKE;
const CIRCLE_RADIUS_MINUS_STROKE = CIRCLE_RADIUS - STROKE;
let participants = [];

function degreesToRad(degrees) {
  const normalizedDegrees = Math.round(
    (degrees / 360 - Math.floor(degrees / 360)) * 360
  );
  const PI = Math.PI;

  return (normalizedDegrees * PI) / 180;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

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

  $sliceNamePath.setAttribute("d", $slice.getAttribute("d"));
  $sliceNamePath.style.transform = `rotate(${
    position * sliceDegrees + sliceDegrees / 2 + 2
  }deg)`;
  $sliceNamePath.id = position;

  const $text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const $textPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "textPath"
  );

  $textPath.setAttribute("href", "#" + position);
  $textPath.setAttribute("text-anchor", "middle");
  $textPath.setAttribute("startOffset", "170px");
  $textPath.innerHTML = sliceName;
  $textPath.classList.add("slice-name-text");
  $text.appendChild($textPath);

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

$getEle("#generate-roulette").addEventListener("click", () => {
  participants = $getEle("#participants")
    .value.split("\n")
    .filter((participant) => participant.trim().length);

  const created = createRoulette(participants);
  const $roulette = $getEle("#roulette-container");

  $roulette.classList.toggle("hidden", !created);
});

$getEle("#spin").addEventListener("click", () => {
  const $roulette = $getEle("#roulette");

  $roulette.style.transition = "none";
  $roulette.style.transform = `rotate(0deg)`;

  setTimeout(() => {
    const completeRounds = randomNumber(6, 12);
    const animationDuration = randomNumber(3.8, 6);
    const finalCoil =
      Math.random() <= 0.7 ? randomNumber(0.95, 1) : randomNumber(1, 1.3);
    $roulette.style.transition = `transform ${animationDuration}s cubic-bezier(0.35,-0.15, 0, ${finalCoil})`;
    $roulette.style.transform = `rotate(${completeRounds * 360}deg)`;
  }, 40);
});

participants = $getEle("#participants")
  .value.split("\n")
  .filter((participant) => participant.trim().length);

const created = createRoulette(participants);
