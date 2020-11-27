const { writeIt } = require('./file_tools');
const Macro = require('./macro');
const { tapFor } = require('./combat_actions');
const { onePageOfHeroes, twoPagesOfHeroes } = require('./hero_actions');
const { increaseSkills, prestige } = require('./master_actions');
const { bookOfShadows } = require('./artifact_actions');
const { ensureEnlarged, ensureHeroMaxBuy, ensureBottomOfPets } = require('./ui_controls');

[{
    name: 'Initialize Skills',
    calls: [
        { fn: ensureEnlarged, },
        { fn: ensureHeroMaxBuy },
        { fn: ensureBottomOfPets },
        { fn: increaseSkills },
        { fn: tapFor, params: [60000] },
        { fn: twoPagesOfHeroes },
    ],
},{
    name: 'Attack Loop (60s)',
    calls: [
        {fn: tapFor, params: [45000]},
        {fn: onePageOfHeroes},
    ],
},{
    name: 'Attack Loop (120s)',
    calls: [
        {fn: tapFor, params: [115000]},
        {fn: onePageOfHeroes},
    ],
},{
    name: 'Max DS',
    calls: [{fn: increaseSkills, params: [true, ['DS']]}],
},{
    name: 'Max HoM',
    calls: [{fn: increaseSkills, params: [true, ['HoM']]}],
},{
    name: 'Max FS',
    calls: [{fn: increaseSkills, params: [true, ['FS']]}],
},{
    name: 'Max WC',
    calls: [{fn: increaseSkills, params: [true, ['WC']]}],
},{
    name: 'Max SC',
    calls: [{fn: increaseSkills, params: [true, ['SC']]}],
},{
    name: 'Prestige',
    calls: [{fn: prestige}],
},{
    name: 'BoS Max Upgrade',
    calls: [{fn: bookOfShadows}],
}].forEach(({name, calls}) => {
    let macro = new Macro(name);
    calls.forEach(({fn, params = []}) => fn(macro, ...params));
    writeIt(macro);
});
