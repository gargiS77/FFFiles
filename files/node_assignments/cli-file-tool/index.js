const fs = require('fs');
const path = require('path');

const action = process.argv[2];
const filename = process.argv[3];

if (action === '--create') {
  if (!filename) {
    console.log('Please provide a filename');
  } else {
    fs.writeFile(filename, 'This is a new file', (err) => {
      if (err) throw err;
      console.log(`${filename} created`);
    });
  }
} 
else if (action === '--read') {
  if (!filename) {
    console.log('Please provide a filename');
  } else {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log('File not found');
      } else {
        console.log('File content: \n' + data);
      }
    });
  }
} 
else if (action === '--delete') {
  if (!filename) {
    console.log('Please provide a filename');
  } else {
    fs.unlink(filename, (err) => {
      if (err) {
        console.log('File not found');
      } else {
        console.log(`${filename} deleted`);
      }
    });
  }
} 
else if (action === '--list') {
  const directory = __dirname;
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    console.log('Files in directory:');
    files.forEach(file => {
      console.log(file);
    });
  });
} 
else {
  console.log('Invalid command. Use --create, --read, --delete, or --list');
}
