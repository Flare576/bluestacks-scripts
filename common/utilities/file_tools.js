const fs = require('fs');
const path = require('path');
const config = require('./config');

const updatePath = '/mnt/c/ProgramData/BlueStacks_bgp64_hyperv/Engine/UserData/InputMapper/UserScripts';
const standardPath = './macros';

exports.writeIt = function (subFolder, {content}) {
    const { updateMode, filter } = config.get();
    const sub = updateMode ? '' :`/${subFolder}` ;
    const folder = updateMode ? updatePath : standardPath;

    const { Name } = content;
    if (filter && !Name.includes(filter)) return;
    const destination = `${folder}${sub}/${Name}.json`;

    console.log(destination);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, JSON.stringify(content, null, 2));
}
