import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

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

const jsFiles = getAllFiles(srcDir).filter(file => file.endsWith('.js') || file.endsWith('.jsx'));

jsFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('from "/src/')) {
    content = content.replace(/from "\/src\//g, 'from "@/');
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
});
