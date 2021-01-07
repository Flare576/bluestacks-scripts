const { ensureEnlarged, ensureHeroMaxBuy, ensureBottomOfPets } = require('../actions/ui_controls');
const { increaseSkills, prestige } = require('../actions/master_actions');
const { hsTapFor } = require('../actions/combat_actions');
const { upgradeHeavenlyStrike, discoverArtifact, bookOfShadows } = require('../actions/artifact_actions');
const { onePageOfHeroes, pagesOfHeroes } = require('../actions/hero_actions');
const { writeIt } = require('../../common/utilities/file_tools');
const Macro = require('../../common/utilities/macro');
const commonBuilds = require('./common-builds');
const config = require('../../common/utilities/config');

module.exports = () => {
    const { daggerCount : origDaggerCount } = config.get();
    config.set({daggerCount: 6});
    const macros = [{
        name: 'Initialize Skills',
        calls: [
            { fn: ensureEnlarged, },
            { fn: ensureHeroMaxBuy },
            { fn: ensureBottomOfPets },
            { fn: increaseSkills, params: [false, ['HS', 'DS', 'HoM', 'FS', 'WC', 'SC']]},
            { fn: hsTapFor, params: [60000] },
            { fn: pagesOfHeroes },
        ],
    },{
        name: 'Fast Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['HS', 'DS', 'HoM', 'FS', 'WC', 'SC']]},
        ],
    },{
        name: 'Careful Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['WC']]},
            {fn: hsTapFor, params: [20000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['FS']]},
            {fn: hsTapFor, params: [20000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['SC']]},
            {fn: hsTapFor, params: [20000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['HoM']]},
            {fn: hsTapFor, params: [20000]},
            {fn: pagesOfHeroes, params: [3, true]},
        ],
    },{
        name: 'All Artifacts',
        calls: [
            {fn: upgradeHeavenlyStrike},
            {fn: discoverArtifact},
            {fn: bookOfShadows},
        ],
    },{
        name: 'Bump HS',
        calls: [
            { fn: increaseSkills, params: [false, ['HS']]},
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: '(60s) Attack Loop',
        calls: [
            {fn: hsTapFor, params: [52000]},
            {fn: onePageOfHeroes},
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: 'BoS Max Upgrade',
        calls: [{fn: bookOfShadows}],
    },{
        name: 'Prestige',
        calls: [{fn: prestige}],
    },{
        name: '(120s) Attack Loop',
        calls: [
            {fn: hsTapFor, params: [30000]}, //22.3s
            {fn: onePageOfHeroes},
            {fn: hsTapFor, params: [44700]},
            {fn: increaseSkills, params: [false, []]},
            {fn: onePageOfHeroes},
        ],
        mods: {LoopType: "UntilStopped"},
    }];

    // Fairy
    config.set({ useFairies: true });
    macros.forEach(({name, calls, mods}) => {
        let macro = new Macro(`HS+F - ${name}`, mods);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/heavenly-strike/fairy', macro);
    });

    // No Fairy
    config.set({ useFairies: false });
    macros.forEach(({name, calls, mods}) => {
        let macro = new Macro(`HS - ${name}`, mods);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/heavenly-strike/no-fairy', macro);
    });
    config.set({daggerCount: origDaggerCount});
}
