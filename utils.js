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
