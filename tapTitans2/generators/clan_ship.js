const { increaseSkills } = require('../actions/master_actions');
const { tapFor } = require('../actions/combat_actions');
const { onePageOfHeroes } = require('../actions/hero_actions');
const { writeIt } = require('../../common/utilities/file_tools');
const Macro = require('../../common/utilities/macro');
const commonBuilds = require('./common-builds');
const config = require('../../common/utilities/config');

module.exports = () => {
    const macros = [...commonBuilds,{
        name: 'Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['DS']]},
            {fn: tapFor, params: [45000]},
            {fn: increaseSkills, params: [true, ['WC']]},
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
        ],
    }];

    // Fairy
    config.set({ useFairies: true });
    macros.forEach(({name, calls, mods}) => {
        let macro = new Macro(`CS+F - ${name}`, mods);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/clan-ship/fairy', macro);
    });

    // No Fairy
    config.set({ useFairies: false });
    macros.forEach(({name, calls, mods}) => {
        let macro = new Macro(`CS - ${name}`, mods);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/clan-ship/no-fairy', macro);
    });
}
