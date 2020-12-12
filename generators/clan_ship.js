const { increaseSkills } = require('../actions/master_actions');
const { tapFor } = require('../actions/combat_actions');
const { onePageOfHeroes } = require('../actions/hero_actions');
const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const commonBuilds = require('./common-builds');
const config = require('../utilities/config');

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
    macros.forEach(({name, calls}) => {
        let macro = new Macro(`CS+F - ${name}`);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/clan-ship/fairy', macro);
    });

    // No Fairy
    config.set({ useFairies: false });
    macros.forEach(({name, calls}) => {
        let macro = new Macro(`CS - ${name}`);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/clan-ship/no-fairy', macro);
    });
}
