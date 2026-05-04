const fs = require('fs');
const fsPromises = require('fs').promises;

console.log("Start reading files...");

// 1. Sync
try {
  let data1 = fs.readFileSync('file1.txt', 'utf8');
  console.log("1. Sync Result: " + data1);
} catch (err) {
  console.log("Error in Sync:", err);
}

// 2. Async Callback
fs.readFile('file2.txt', 'utf8', (err, data2) => {
  if (err) {
    console.log("Error in Async Callback:", err);
  } else {
    console.log("2. Async Callback Result: " + data2);
  }
});

// 3. Promises (Async/Await approach)
async function readPromise() {
  try {
    let data3 = await fsPromises.readFile('file3.txt', 'utf8');
    console.log("3. Promise Result: " + data3);
  } catch (err) {
    console.log("Error in Promise:", err);
  }
}

readPromise();

console.log("End of script reached.");
