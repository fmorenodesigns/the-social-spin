import { expect, test } from "vitest";

import { areEntriesSimilar, pickRandomIntegerBetween } from "./utils";

test("Test `pickRandomIntegerBetween`", () => {
  const ITERATIONS = 10000000;
  const entries = ["Dog", "Duck", "Cat", "Bird", "Lion"];

  const results = entries.reduce((current, _, index) => {
    current[index] = {
      count: 0,
      percentage: 0,
    };
    return current;
  }, {} as { [index: number]: { count: number; percentage: number } });

  for (let i = 0; i < ITERATIONS; i++) {
    const entryIndex = pickRandomIntegerBetween(0, entries.length - 1);
    results[entryIndex].count += 1;
  }

  entries.forEach((_, index) => {
    results[index].percentage = results[index].count / ITERATIONS;
  });

  expect(results[0].percentage).toBeCloseTo(0.2);
  expect(results[1].percentage).toBeCloseTo(0.2);
  expect(results[2].percentage).toBeCloseTo(0.2);
  expect(results[3].percentage).toBeCloseTo(0.2);
  expect(results[3].percentage).toBeCloseTo(0.2);
});

test.each([
  [[], [], true],
  [["Dog"], [], false],
  [["Dog"], ["Dog"], true],
  [["Dog"], ["Dog", "Cat"], false],
  [["Cat", "Dog"], ["Dog", "Cat"], true],
])("Test `areEntriesSimilar`", (entriesA, entriesB, expectedResult) => {
  expect(areEntriesSimilar(entriesA, entriesB)).toBe(expectedResult);
});
