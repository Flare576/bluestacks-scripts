const fs = require('fs');
// const outputPath = '/mnt/c/Users/Flare576/Documents/TT2_Macros';
// const outputPath = '/mnt/c/ProgramData/BlueStacks_bgp64_hyperv/Engine/UserData/InputMapper/UserScripts';
const outputPath = './macros';

exports.writeIt = function ({content}) {
    const { Name } = content;
    fs.writeFileSync(`${outputPath}/${Name}.json`, JSON.stringify(content, null, 2));
}
