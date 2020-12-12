const { increaseSkills } = require('../actions/master_actions');
const { tapFor } = require('../actions/combat_actions');
const { onePageOfHeroes } = require('../actions/hero_actions');
const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const commonBuilds = require('./common-builds');
const config = require('../utilities/config');

module.exports = () => {
    const macros = [...commonBuilds, {
        name: 'Max Skills',
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
            {fn: onePageOfHeroes},
        ],
    }];

    // Fairy
    config.set({ useFairies: true });
    macros.forEach(({name, calls}) => {
        let macro = new Macro(`SC+F - ${name}`);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/shadow-clone/fairy', macro);
    });

    // No Fairy
    config.set({ useFairies: false });
    macros.forEach(({name, calls}) => {
        let macro = new Macro(`SC - ${name}`);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/shadow-clone/no-fairy', macro);
    });
}
