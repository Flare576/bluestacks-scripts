const fs = require('fs');
const path = require('path');
const config = require('./config');

const updatePath = '/mnt/c/ProgramData/BlueStacks_bgp64_hyperv/Engine/UserData/InputMapper/UserScripts';
// const standardPath = './macros';
const standardPath = '/mnt/c/Users/flare576/Documents/TT2_Macros';

let useSubfolder = true;

exports.updateMode = function () {
    outputPath = updatePath;
    useSubfolder = false;
}

exports.writeIt = function (subFolder, {content}) {
    const { updateMode } = config.get();
    const sub = updateMode ? '' :`/${subFolder}` ;
    const folder = updateMode ? updatePath : standardPath;

    const { Name } = content;
    const destination = `${folder}${sub}/${Name}.json`;

    console.log(destination);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, JSON.stringify(content, null, 2));
}
