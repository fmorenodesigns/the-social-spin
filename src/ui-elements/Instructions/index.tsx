import "./styles.scss";

export default function Instructions() {
  return (
    <p id="instructions">
      Separate entries by a comma(,) or a line-break. When spinning the
      roulette, it randomly
      <span
        data-tooltip="The roulette has been tested against the law of the large numbers: with 2 entries, each entry is expected to have a 50% chance of being chosen after spinning the wheel a large number of times."
        className="tooltip--left"
      >
        <i className="far fa-question-circle law-of-large-numbers-explanation"></i>
      </span>
      picks one of the given entries.
    </p>
  );
}
