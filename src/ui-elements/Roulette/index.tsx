import "./styles.scss";

import cx from "classnames";
import { useMemo, useRef, useState } from "react";
import React from "react";

import Colors from "./Colors";
import Pointer from "./Pointer";
import {
  COLOR_NAMES,
  COLORS_COUNT,
  DIAMETER,
  SPACING_BETWEEN_SLICES_PX,
} from "./settings";
import {
  areEntriesSimilar,
  getColorId,
  getSlicePath,
  getSpiningDuration,
  isLoser,
  pickRandomIntegerBetween,
} from "./utils";

interface Props {
  entries: string[];
}

export default function Roulette({ entries }: Props) {
  const [currentEntries, setCurrentEntries] = useState(entries);
  const [winnerAngle, setWinnerAngle] = useState<number>(0);
  const [winnerIndex, setWinnerIndex] = useState<number>();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [spinningDuration, setSpinningDuration] = useState<number>(
    getSpiningDuration()
  );
  const spinTimeoutId = useRef<number>();
  const clearSpinTimeout = () => window.clearTimeout(spinTimeoutId.current);

  if (!areEntriesSimilar(currentEntries, entries)) {
    // Reset state if the entries change
    setWinnerIndex(undefined);
    setWinnerAngle(0);
    setSpinning(false);
    clearSpinTimeout();
    setCurrentEntries(entries);
  }

  const displayedEntries = useMemo(() => {
    // Require a minimum of two entries
    if (entries.length < 2) return undefined;

    // Make the wheel look fuller by adding entry duplicates
    const newEntries = [...entries];
    while (newEntries.length < 10) {
      newEntries.push(...entries);
    }

    return newEntries;
  }, [entries]);

  if (typeof displayedEntries === "undefined") return null;

  const entriesCount = displayedEntries.length;
  const sliceAngle = 360 / entriesCount;
  const svgSize = DIAMETER * 2;

  const drawWinner = () => {
    if (spinning) return;
    setSpinning(true);

    // Reset the winner so that there's no slice with class "loser"
    setWinnerIndex(undefined);

    const winnerIdx = pickRandomIntegerBetween(0, entriesCount - 1);

    // All angles are given in degrees.
    // A count of full turns the wheel will spin
    const fullTurnsCount = pickRandomIntegerBetween(20, 35);
    // An angle offset within the winner's slice
    const offsetPadding = sliceAngle * 0.05; // Padding to ensure that the pointer doesn't land on the very edge of the slice
    const inWinnerSliceOffset = pickRandomIntegerBetween(
      offsetPadding,
      sliceAngle - offsetPadding
    );
    // The angle at which the winner's slice starts
    const winnerSliceStart = winnerIdx * sliceAngle;

    setWinnerAngle((currentAngle) => {
      const diffFromOrigin = 360 - Math.abs(currentAngle % 360);
      return (
        currentAngle -
        diffFromOrigin -
        (360 * fullTurnsCount + winnerSliceStart + inWinnerSliceOffset)
      );
    });

    console.log("And the winner is...");
    spinTimeoutId.current = window.setTimeout(() => {
      console.log(displayedEntries[winnerIdx]);

      setWinnerIndex(winnerIdx);
      setSpinning(false);
      setSpinningDuration(getSpiningDuration());
      clearSpinTimeout();
    }, spinningDuration - 200);
  };

  return (
    <div
      className="roulette"
      style={{ ["--diameter" as any]: `${DIAMETER}px` }}
    >
      <div
        className="roulette-rotating-part"
        style={{
          transform: `rotateZ(${winnerAngle}deg)`,
          transitionDuration: spinning ? `${spinningDuration}ms` : "0ms",
        }}
      >
        <div className="roulette-slices">
          <svg
            width={svgSize}
            height={svgSize}
            className="roulette-slices-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Colors />

            {displayedEntries.map((entry, index) => {
              const radius = svgSize / 2 + SPACING_BETWEEN_SLICES_PX / 2;
              const color = COLOR_NAMES[index % COLORS_COUNT];

              return (
                <polygon
                  key={`slice-${index}-${entry}`}
                  className={cx(
                    "roulette-slices-slice",
                    isLoser(index, winnerIndex) && "roulette--loser-slice"
                  )}
                  points={getSlicePath(radius, sliceAngle)}
                  style={{
                    transform: `rotate(${index * sliceAngle}deg`,
                    strokeWidth: SPACING_BETWEEN_SLICES_PX,
                    fill: `url('#${getColorId(color)}')`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="roulette-entry-names">
          {displayedEntries.map((entry, index) => {
            const rotate = index * sliceAngle + sliceAngle / 2;

            return (
              <div
                key={`slice-name-${index}-${entry}`}
                className={cx(
                  "roulette-entry-names-name",
                  isLoser(index, winnerIndex) && "roulette--loser-slice"
                )}
                style={{
                  transform: `rotate(${rotate}deg`,
                }}
              >
                {entry}
              </div>
            );
          })}
        </div>
      </div>

      <div className="roulette-spin-button" onClick={drawWinner}>
        <div className="roulette-spin-button-text">SPIN</div>
      </div>

      <div className="roulette-shadow" />
      <div className="roulette-outer-ring" />

      <Pointer />
    </div>
  );
}
