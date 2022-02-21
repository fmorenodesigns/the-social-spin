import Tooltip from "../Tooltip";
import "./styles.scss";

export default function Instructions() {
  return (
    <div id="instructions">
      <span>
        Separate entries by a comma(,) or a line-break. When spinning the
        roulette, it randomly
      </span>
      <Tooltip
        placement="auto-end"
        content="The roulette has been tested against the law of the large numbers:
          with 2 entries, each entry is expected to have a 50% chance of being
          chosen after spinning the wheel a large number of times."
      >
        <i className="far fa-question-circle law-of-large-numbers-explanation"></i>
      </Tooltip>
      <span>picks one of the given entries.</span>
    </div>
  );
}
