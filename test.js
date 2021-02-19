// This is a test of the method for picking a winner against the law of large numbers
// Run it with node: node test.js from the file's directory

const ITERATIONS = 1000;
const entries = ["Entry 1", "Entry 2", "Entry 3", "Entry 4", "Entry 5"];

let results = {};

entries.forEach((entry) => {
  results[entry] = {
    count: 0,
    percentage: 0,
  };
});

for (let i = 0; i < ITERATIONS; i++) {
  // the method for picking a winner
  const rand = Math.random();
  const entry = entries[Math.floor(entries.length * (1 - rand))];
  //

  results[entry].count += 1;
}

entries.forEach((entry) => {
  results[entry].percentage = results[entry].count / ITERATIONS;
});

console.log(results);
