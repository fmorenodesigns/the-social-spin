import React from "react";

import { COLORS } from "./settings";
import { getColorId } from "./utils";

export default function Colors() {
  return (
    <>
      {COLORS.map((color) => (
        <linearGradient id={`${getColorId(color.name)}`} key={color.name}>
          <stop offset="0%" stopColor={color.start} />
          <stop offset="55%" stopColor={color.end} />
        </linearGradient>
      ))}
    </>
  );
}
