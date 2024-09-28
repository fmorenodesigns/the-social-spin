import React from "react";

export default function Pointer() {
  return (
    <svg
      className="roulette-pointer"
      viewBox="0 0 40 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient id="pointer-gradient">
        <stop offset="0%" stopColor="#efd574" />
        <stop offset="20%" stopColor="#efd574" />
        <stop offset="50%" stopColor="#ede191" />
        <stop offset="50%" stopColor="#efd574" />
        <stop offset="50%" stopColor="#c59329" />
        <stop offset="90%" stopColor="#a96621" />
        <stop offset="100%" stopColor="#a96621" />
      </linearGradient>
      <path
        d="M0 12.6316L20 0L40 12.6316L20 80L0 12.6316Z"
        fill="url('#pointer-gradient')"
      />
    </svg>
  );
}
