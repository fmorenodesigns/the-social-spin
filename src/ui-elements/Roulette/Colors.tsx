import React from "react";

import { COLORS } from "./settings";
import { getColorId } from "./utils";

export default function Colors() {
  return (
    <>
      {Object.entries(COLORS).map(([name, color]) => (
        <linearGradient id={`${getColorId(name)}`} key={name}>
          <stop offset="0%" stopColor={color.start} />
          <stop offset="55%" stopColor={color.end} />
        </linearGradient>
      ))}
    </>
  );
}
