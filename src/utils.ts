export function getUrlParam(paramName: string) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(paramName);
}

function setUrlParam(paramName: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(paramName, value);

  const decodedURL = decodeURIComponent(url.href);
  window.history.pushState({ path: decodedURL }, "", decodedURL);
}

export function saveEntriesToUrl(entries: string[]) {
  setUrlParam("entries", entries.join(","));
}
