const fs = require('fs');
const path = require('path');
// const outputPath = '/mnt/c/ProgramData/BlueStacks_bgp64_hyperv/Engine/UserData/InputMapper/UserScripts';
const outputPath = './macros';

exports.writeIt = function (subFolder, {content}) {
    const { Name } = content;
    const destination = `${outputPath}/${subFolder}/${Name}.json`;
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, JSON.stringify(content, null, 2));
}
