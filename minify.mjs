import fs from 'fs';
import path from 'path';
import { minify } from 'terser';

const dir = path.join(process.cwd(), 'dist', 'data');

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const jsFiles = files.filter((file) => file.endsWith('.js'));

  jsFiles.forEach((file) => {
    const filePath = path.join(dir, file);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', file, err);
        return;
      }
      minify(data)
        .then((result) => {
          fs.writeFile(filePath, result.code, 'utf-8', (err) => {
            if (err) {
              console.error('Error writing minified file:', file, err);
              return;
            }
            console.log(`Overwritten: ${file}`);
          });
        })
        .catch((minifyError) => {
          console.error('Error minifying file:', file, minifyError);
        });
    });
  });
});
