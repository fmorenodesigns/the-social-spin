import React from "react";
import "./styles.scss";

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
