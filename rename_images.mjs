import fs from 'fs';
import path from 'path';

const imgDir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(imgDir);

let renamed = 0;
for (const file of files) {
    if (file.includes('\xA0')) {
        const newName = file.replace(/\xA0/g, ' ');
        fs.renameSync(path.join(imgDir, file), path.join(imgDir, newName));
        console.log(`Renamed: "${file}" -> "${newName}"`);
        renamed++;
    }
}
console.log(`Total renamed: ${renamed}`);
