import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const componentsDir = path.join(process.cwd(), 'src/components');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const scssFiles = getAllFiles(componentsDir).filter(file => file.endsWith('.scss'));

scssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('@import "styles/extend')) {
    const relativePathToSrc = path.relative(path.dirname(file), path.join(process.cwd(), 'src'));
    const newImport = `@import "${relativePathToSrc}/styles/extend";`;
    
    // Replace both with and without .scss extension
    content = content.replace(/@import "styles\/extend\.scss";/g, newImport);
    content = content.replace(/@import "styles\/extend";/g, newImport);
    
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
});
