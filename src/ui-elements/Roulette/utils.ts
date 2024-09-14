export function pickRandomIntegerBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isLoser(index: number, winnerIndex?: number) {
  return typeof winnerIndex !== "undefined" && winnerIndex !== index;
}

export function getSpiningDuration() {
  return pickRandomIntegerBetween(8000, 12000);
}

export function areEntriesSimilar<T extends string[]>(
  entriesA: T,
  entriesB: T
): boolean {
  return (
    entriesA.every((entry) => entriesB.includes(entry)) &&
    entriesB.every((entry) => entriesA.includes(entry))
  );
}

export function getSlicePath(radius: number, angle: number) {
  const diameter = radius * 2;
  const x = radius * Math.cos(angle * (Math.PI / 180)) + radius;
  const y = radius * Math.sin(angle * (Math.PI / 180)) + radius;

  if (angle >= 0 && angle <= 45) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${x} ${y}`;
  }
  if (angle > 45 && angle <= 90) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${x} ${y}`;
  }
  if (angle > 90 && angle <= 135) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, ${x} ${y}`;
  }
  if (angle > 135 && angle <= 180) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, ${x} ${y}`;
  }
  if (angle > 180 && angle <= 225) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, ${x} ${y}`;
  }
  if (angle > 225 && angle <= 270) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, 0 0, ${x} ${y}`;
  }
  if (angle > 270 && angle <= 315) {
    return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, 0 0, ${radius} 0, ${x} ${y}`;
  }

  return `${radius} ${radius}, ${diameter} ${radius}, ${diameter} ${diameter}, ${radius} ${diameter}, 0 ${diameter}, 0 ${radius}, 0 0, ${radius} 0, ${diameter} 0, ${x} ${y}`;
}

export function getGradientName(index: number) {
  switch (index % 4) {
    case 0:
      return "purple";
    case 1:
      return "orange";
    case 2:
      return "pink";
    case 3:
    default:
      return "green";
  }
}
