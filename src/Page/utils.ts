export function cleanEntriesList(entriesList: string[]) {
  return entriesList
    .map((entry) => entry.trim())
    .filter((entry) => entry.length);
}
