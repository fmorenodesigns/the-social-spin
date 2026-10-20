import "./styles.scss";

import React from "react";

export default function Header() {
  return (
    <header className="page-header">
      <img
        className="logo"
        src="./logo.png"
        alt="Spin wheel for decision-making"
        height={120}
      />
    </header>
  );
}
