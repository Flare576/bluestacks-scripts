const { increaseSkills } = require('../actions/master_actions');
const { tapFor } = require('../actions/combat_actions');
const { upgradeShadowClone, discoverArtifact, bookOfShadows } = require('../actions/artifact_actions');
const { onePageOfHeroes, pagesOfHeroes } = require('../actions/hero_actions');
const { writeIt } = require('../../common/utilities/file_tools');
const Macro = require('../../common/utilities/macro');
const commonBuilds = require('./common-builds');
const config = require('../../common/utilities/config');

module.exports = () => {
    const macros = [...commonBuilds, {
        name: 'Careful Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['DS']]},
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['WC']]},
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['FS']]},
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['SC']]},
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['HoM']]},
            {fn: tapFor, params: [45000]},
            {fn: pagesOfHeroes, params: [3, true]},
        ],
    },{
        name: 'Fast Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['DS', 'WC', 'FS', 'SC', 'HoM']]},
        ],
    },{
        name: 'All Artifacts',
        calls: [
            {fn: upgradeShadowClone},
            {fn: discoverArtifact},
            {fn: bookOfShadows},
        ],
    }];

    // Fairy
    config.set({ useFairies: true });
    macros.forEach(({name, calls, mods}) => {
        let macro = new Macro(`SC+F - ${name}`, mods);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/shadow-clone/fairy', macro);
    });

    // No Fairy
    config.set({ useFairies: false });
    macros.forEach(({name, calls, mods}) => {
        let macro = new Macro(`SC - ${name}`, mods);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/shadow-clone/no-fairy', macro);
    });
}
