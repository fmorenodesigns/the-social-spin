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

export function parseEntriesText(entriesText: string) {
  const entriesList = entriesText.replace(/\n/g, ",").split(",");

  return entriesList
    .map((entry) => entry.trim())
    .filter((entry) => entry.length);
}

export function getEntriesFromUrl(): string | null {
  const entries = getUrlParam("entries");
  if (!entries) return null;

  return parseEntriesText(entries).join(", ");
}
