// This is a test of the method for picking a winner against the law of large numbers
// Run it with the command: `npm run test` from the file's directory

import { randBetween } from "./utils";

const ITERATIONS = 10000000;
const entries = ["Entry 1", "Entry 2", "Entry 3", "Entry 4", "Entry 5"];

let results: { [index: number]: { count: number; percentage: number } } = {};

entries.forEach((_, index) => {
  results[index] = {
    count: 0,
    percentage: 0,
  };
});

for (let i = 0; i < ITERATIONS; i++) {
  // the method for picking a winner
  const entryIndex = randBetween(0, entries.length - 1);
  //

  results[entryIndex].count += 1;
}

entries.forEach((_, index) => {
  results[index].percentage = results[index].count / ITERATIONS;
});

console.log(results);
