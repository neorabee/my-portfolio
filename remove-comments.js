const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      content = content.replace(/^\s*\/\/.*$/gm, '');
      content = content.replace(/ \/\/.*$/gm, '');
      
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir('src/components');
console.log('Done');
