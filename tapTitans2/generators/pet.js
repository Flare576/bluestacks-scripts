const { increaseSkills, prestige } = require('../actions/master_actions');
const { petTapFor } = require('../actions/combat_actions');
const { upgradeAll, discoverArtifact } = require('../actions/artifact_actions');
const { onePageOfHeroes, spamHeroes } = require('../actions/hero_actions');
const { joinLeaveBoss } = require('../actions/ui_controls');
const { writeIt } = require('../../common/utilities/file_tools');
const Macro = require('../../common/utilities/macro');
const commonBuilds = require('./common-builds');
const config = require('../../common/utilities/config');

module.exports = () => {
    const macros = [{
        name: 'Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['FS']]},
            {fn: petTapFor, params: [45000]},
            {fn: increaseSkills, params: [true, ['DS']]},
            {fn: petTapFor, params: [45000]},
        ],
    },{
        name: 'Bump Skills',
        calls: [
            {fn: increaseSkills}
        ],
    },{
        name: 'Attack Round',
        calls: [
            {fn: increaseSkills, params: [false, []]},
            {fn: joinLeaveBoss},
            {fn: petTapFor, params: [20000]},
            {fn: joinLeaveBoss},
            {fn: spamHeroes, params: [20000]},
            {fn: joinLeaveBoss},
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: 'Default Artifacts',
        calls: [
            {fn: discoverArtifact, params: [5]},
            {fn: upgradeAll},
        ],
    },{
        name: 'Prestige',
        calls: [{fn: prestige}],
    }
    ];

    // Fairy
    config.set({ useFairies: true });
    macros.forEach(({name, calls}) => {
        let macro = new Macro(`Pet+F - ${name}`);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/pet/fairy', macro);
    });

    // No Fairy
    config.set({ useFairies: false });
    macros.forEach(({name, calls}) => {
        let macro = new Macro(`Pet - ${name}`);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/pet/no-fairy', macro);
    });
}

