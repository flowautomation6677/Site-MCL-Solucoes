import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const imgDir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(imgDir);

let renamedCount = 0;
files.forEach(file => {
    if (file.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i)) {
        const ext = path.extname(file);
        const base = path.basename(file, ext);

        // Remove accents, replace non-alphanumeric with hyphen, lowercase
        let cleanBase = base.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        cleanBase = cleanBase.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();

        const newName = cleanBase + ext.toLowerCase();

        if (file !== newName) {
            console.log(`Renaming: "${file}" -> "${newName}"`);

            // On Windows, renaming a file to a lowercase version of itself sometimes requires an intermediate step
            // or we can use git mv directly. But using fs.renameSync is safer for intermediate steps.
            const oldPath = path.join(imgDir, file);
            const tempPath = path.join(imgDir, file + '.tmp');
            const newPath = path.join(imgDir, newName);

            try {
                fs.renameSync(oldPath, tempPath);
                fs.renameSync(tempPath, newPath);

                // Add to git explicitly to track the rename
                execSync(`git add "${newPath}"`);
                try {
                    execSync(`git rm "${oldPath}" --cached`);
                } catch (e) { /* ignore if not tracked */ }

                renamedCount++;
            } catch (err) {
                console.error(`Error renaming ${file}: ${err.message}`);
            }
        }
    }
});

console.log(`Safely slugified ${renamedCount} image filenames.`);
