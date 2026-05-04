const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n');
  let total = 0;
  let highest = -1;
  let lowest = 999;
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line !== '') {
      let parts = line.split(',');
      let marks = parseInt(parts[1]);

      total += marks;
      count++;

      if (marks > highest) highest = marks;
      if (marks < lowest) lowest = marks;
    }
  }

  let average = total / count;

  let report = `Student Report\n`;
  report += `----------------\n`;
  report += `Total Students: ${count}\n`;
  report += `Average Marks: ${average}\n`;
  report += `Highest Marks: ${highest}\n`;
  report += `Lowest Marks: ${lowest}\n`;

  fs.writeFile('report.txt', report, (err) => {
    if (err) throw err;
    console.log('report.txt created successfully!');
  });
});
