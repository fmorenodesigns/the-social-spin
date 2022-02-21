export function cleanEntriesList(entriesList: string[]) {
  return entriesList
    .map((entry) => entry.trim())
    .filter((entry) => entry.length);
}

export function getSlicePath(radius: number, angle: number) {
  const diameter = radius * 2;
  const x = radius * Math.cos(angle * (Math.PI / 180)) + radius;
  const y = radius * Math.sin(angle * (Math.PI / 180)) + radius;

  if (angle >= 0 && angle <= 45) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${x} ${y}`;
  }
  if (angle > 45 && angle <= 90) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${x} ${y}`;
  }
  if (angle > 90 && angle <= 135) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, ${x} ${y}`;
  }
  if (angle > 135 && angle <= 180) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, ${x} ${y}`;
  }
  if (angle > 180 && angle <= 225) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, ${x} ${y}`;
  }
  if (angle > 225 && angle <= 270) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, 0 0, ${x} ${y}`;
  }
  if (angle > 270 && angle <= 315) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, 0 0, ${radius} 0, ${x} ${y}`;
  }

  return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, 0 0, ${radius} 0, ${diameter} 0, ${x} ${y}`;
}

export async function copyToClipboard(text: string) {
  var data = [
    new ClipboardItem({
      "text/plain": new Blob([text], { type: "text/plain" }),
    }),
  ];

  let success = false;
  await navigator.clipboard.write(data).then(() => {
    success = true;
  });

  return success;
}

export function getUrlParam(paramName: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(paramName);
}

export function setUrlParam(paramName: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(paramName, value);

  const decodedURL = decodeURIComponent(url.href);
  window.history.pushState({ path: decodedURL }, "", decodedURL);
}

export function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
