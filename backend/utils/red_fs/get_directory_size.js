// Returns the size of a directory in bytes
const fs = require('fs');
const path = require('path');

function getDirSize(dirPath) {
    let sizeBytes = 0;

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isFile()) {
            const stats = fs.statSync(fullPath);
            sizeBytes += stats.size;
        } else if (entry.isDirectory()) {
            sizeBytes += getDirSize(fullPath); // recursion
        }
    }

    return sizeBytes;
}

module.exports = getDirSize;