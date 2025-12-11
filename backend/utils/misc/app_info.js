const fs = require('fs');
const path = require('path');
module.exports = () => {
    const raw = fs.readFileSync(path.join(__dirname, '../../../package.json'), 'utf-8');
    const packageJSON = JSON.parse(raw);

    return {
        package: packageJSON.name,
        version: packageJSON.version,
        "dev-phase": packageJSON["dev-phase"],
    };
}