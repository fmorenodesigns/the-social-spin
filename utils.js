const $getEle = document.querySelector.bind(document);
const $getAllEle = document.querySelectorAll.bind(document);

Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }

  return this;
};

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

function getUrlParam(paramName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(paramName);
}

function setUrlParam(paramName, value) {
  const href = window.location.href;
  const url = new URL(href);

  url.searchParams.set(paramName, value);

  const decodedURL = decodeURIComponent(url);

  window.history.pushState({ path: decodedURL }, "", decodedURL);
}

function cleanParticipantsList(participantsList) {
  return participantsList
    .map((participant) => participant.trim())
    .filter((participant) => participant.length);
}

function copyToClipboard(text) {
  const $fakeInput = document.createElement("input");
  $fakeInput.classList.add("fake-input");

  document.getElementsByTagName("body")[0].appendChild($fakeInput);

  $fakeInput.value = text;
  $fakeInput.select();
  $fakeInput.setSelectionRange(0, 99999);
  document.execCommand("copy");

  $fakeInput.remove();

  alert("Link copied!");
}
