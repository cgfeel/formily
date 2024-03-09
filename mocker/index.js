const fs = require('fs');
const path = require('path');

const mockDir = path.resolve(__dirname);
const mock = {};

function readdirSync(dir, isRoot) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const info = fs.statSync(`${dir}/${file}`);
    if (info.isDirectory()) {
      readdirSync(`${dir}/${file}`, false);
    } else {
      if (!(isRoot && file === 'index.js')) {
        Object.assign(mock, require(`${dir}/${file}`));
      }
    }
  });
}

readdirSync(mockDir, true);

module.exports = mock;