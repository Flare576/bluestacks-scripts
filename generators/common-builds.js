const { tapFor } = require('../actions/combat_actions');
const { onePageOfHeroes, pagesOfHeroes } = require('../actions/hero_actions');
const { increaseSkills, prestige } = require('../actions/master_actions');
const { bookOfShadows } = require('../actions/artifact_actions');
const { ensureEnlarged, ensureHeroMaxBuy, ensureBottomOfPets } = require('../utilities/ui_controls');

module.exports = [{
    name: 'Initialize Skills',
    calls: [
        { fn: ensureEnlarged, },
        { fn: ensureHeroMaxBuy },
        { fn: ensureBottomOfPets },
        { fn: increaseSkills },
        { fn: tapFor, params: [60000] },
        { fn: pagesOfHeroes },
    ],
},{
    name: '(60s) Attack Loop',
    calls: [
        {fn: tapFor, params: [45000]},
        {fn: onePageOfHeroes},
    ],
    mods: {LoopType: "UntilStopped"},
},{
    name: '(120s) Attack Loop',
    calls: [
        {fn: tapFor, params: [24000]},
        {fn: onePageOfHeroes},
        {fn: tapFor, params: [24000]},
        { fn: pagesOfHeroes },
        {fn: tapFor, params: [24000]},
        {fn: onePageOfHeroes},
        {fn: tapFor, params: [24000]},
        { fn: pagesOfHeroes },
    ],
    mods: {LoopType: "UntilStopped"},
},{
    name: 'Prestige',
    calls: [{fn: prestige}],
},{
    name: 'BoS Max Upgrade',
    calls: [{fn: bookOfShadows}],
}];
