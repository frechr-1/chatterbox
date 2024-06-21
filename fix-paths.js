const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');

const indexPath = path.join(buildDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace absolute paths with relative paths
indexContent = indexContent.replace(/\/chatterbox\//g, '/');

// Write the changes back to the file
fs.writeFileSync(indexPath, indexContent, 'utf8');
