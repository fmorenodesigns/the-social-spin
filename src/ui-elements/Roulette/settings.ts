import { Color } from "./types";

export const DIAMETER = 600;

export const COLORS: { name: Color; start: string; end: string }[] = [
  {
    name: Color.Purple,
    start: "#835687",
    end: "#3a2b40",
  },
  {
    name: Color.Orange,
    start: "#f8f445",
    end: "#e27220",
  },
  {
    name: Color.Pink,
    start: "#fe2392",
    end: "#82113e",
  },
  {
    name: Color.Green,
    start: "#f2f23f",
    end: "#75991b",
  },
];
export const COLORS_COUNT = COLORS.length;
