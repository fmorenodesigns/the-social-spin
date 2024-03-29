import "./styles.scss";

import cx from "classnames";
import { getSlicePath, randBetween } from "../../utils";
import { useEffect, useMemo, useState } from "react";

const DIAMETER = 600;
let drawWinnerTimeout: any = null;

interface Props {
  entries: string[];
  strokeWidth?: number;
}

export default function Roulette({ entries, strokeWidth = 1 }: Props) {
  const [winnerAngle, setWinnerAngle] = useState<number>(0);
  const [winnerIndex, setWinnerIndex] = useState<number>();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [spinningDuration, setSpinningDuration] = useState<number>(
    _spiningDuration()
  );

  const displayedEntries = useMemo(() => {
    // Require a minimum of two entries
    if (entries.length < 2) return undefined;

    const newEntries = [...entries];

    // Make the wheel look fuller by adding entry duplicates
    while (newEntries.length < 10) {
      newEntries.push(...entries);
    }

    return newEntries;
  }, [entries]);

  useEffect(() => {
    // Reset state if the entries change
    if (drawWinnerTimeout !== null) {
      console.log(" ", "Aborted!");
      clearSpinningTimeout();
    }

    setWinnerIndex(undefined);
    setWinnerAngle(0);
    setSpinning(false);
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

    const winnerIdx = randBetween(0, entriesCount - 1);

    // All angles are given in degrees.
    // A count of full turns the wheel will spin
    const fullTurnsCount = randBetween(20, 35);
    // An angle offset within the winner's slice
    const offsetPadding = sliceAngle * 0.05; // Padding to ensure that the pointer doesn't land on the very edge of the slice
    const inWinnerSliceOffset = randBetween(
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
    drawWinnerTimeout = setTimeout(() => {
      console.log(" ", displayedEntries[winnerIdx]);
      setWinnerIndex(winnerIdx);
      setSpinning(false);
      setSpinningDuration(_spiningDuration());
      clearSpinningTimeout();
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
            <linearGradient id="purple-gradient">
              <stop offset="0%" stopColor="#835687" />
              <stop offset="55%" stopColor="#3a2b40" />
            </linearGradient>
            <linearGradient id="orange-gradient">
              <stop offset="0%" stopColor="#f8f445" />
              <stop offset="55%" stopColor="#e27220" />
            </linearGradient>
            <linearGradient id="pink-gradient">
              <stop offset="0%" stopColor="#fe2392" />
              <stop offset="55%" stopColor="#82113e" />
            </linearGradient>
            <linearGradient id="green-gradient">
              <stop offset="0%" stopColor="#f2f23f" />
              <stop offset="55%" stopColor="#75991b" />
            </linearGradient>

            {displayedEntries.map((entry, index) => {
              const radius = svgSize / 2 + strokeWidth / 2;
              const gradientName = getGradientName(index);

              return (
                <polygon
                  key={`slice-${index}-${entry}`}
                  className={cx(
                    "roulette-slices-slice",
                    isLoser(index, winnerIndex) && "roulette--loser-slice"
                  )}
                  points={getSlicePath(radius, sliceAngle)}
                  style={{
                    transform: `rotate(${index / (1 / sliceAngle)}deg`,
                    strokeWidth,
                    fill: `url('#${gradientName}-gradient')`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="roulette-entry-names">
          {displayedEntries.map((entry, index) => {
            const rotate = index / (1 / sliceAngle) + sliceAngle / 2;

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
    </div>
  );
}

function getGradientName(index: number) {
  switch (index % 4) {
    case 0:
      return "purple";
    case 1:
      return "orange";
    case 2:
      return "pink";
    default:
    case 3:
      return "green";
  }
}

function isLoser(index: number, winnerIndex?: number) {
  return typeof winnerIndex !== "undefined" && winnerIndex !== index;
}

function _spiningDuration() {
  return randBetween(8000, 12000);
}

function clearSpinningTimeout() {
  clearTimeout(drawWinnerTimeout);
  drawWinnerTimeout = null;
}
