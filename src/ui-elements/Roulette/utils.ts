import { randBetween } from "../../utils";

export function getGradientName(index: number) {
  switch (index % 4) {
    case 0:
      return "purple";
    case 1:
      return "orange";
    case 2:
      return "pink";
    case 3:
    default:
      return "green";
  }
}

export function isLoser(index: number, winnerIndex?: number) {
  return typeof winnerIndex !== "undefined" && winnerIndex !== index;
}

export function getSpiningDuration() {
  return randBetween(8000, 12000);
}

export function entriesChanged<T extends string[]>(
  entriesA: T,
  entriesB: T
): boolean {
  return (
    entriesA.some((entry) => !entriesB.includes(entry)) ||
    entriesB.some((entry) => !entriesA.includes(entry))
  );
}
