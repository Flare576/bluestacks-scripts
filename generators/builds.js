const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const { tapFor } = require('../actions/combat_actions');
const { onePageOfHeroes, twoPagesOfHeroes } = require('../actions/hero_actions');
const { increaseSkills, prestige } = require('../actions/master_actions');
const { bookOfShadows } = require('../actions/artifact_actions');
const { ensureEnlarged, ensureHeroMaxBuy, ensureBottomOfPets } = require('../utilities/ui_controls');

module.exports = () => {
    [{
        name: 'CS&SC - Initialize Skills',
        calls: [
            { fn: ensureEnlarged, },
            { fn: ensureHeroMaxBuy },
            { fn: ensureBottomOfPets },
            { fn: increaseSkills },
            { fn: tapFor, params: [60000] },
            { fn: twoPagesOfHeroes },
        ],
    },{
        name: 'CS&SC - (60s) Attack Loop',
        calls: [
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
        ],
    },{
        name: 'CS&SC - (120s) Attack Loop',
        calls: [
            {fn: tapFor, params: [115000]},
            {fn: onePageOfHeroes},
        ],
    },{
        name: 'SC - Max Skills',
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
    },{
        name: 'CS - Max Skills',
        calls: [
            {fn: increaseSkills, params: [true, ['DS']]},
            {fn: tapFor, params: [45000]},
            {fn: increaseSkills, params: [true, ['WC']]},
            {fn: tapFor, params: [45000]},
            {fn: onePageOfHeroes},
        ],
    },{
        name: 'Prestige',
        calls: [{fn: prestige}],
    },{
        name: 'BoS Max Upgrade',
        calls: [{fn: bookOfShadows}],
    }].forEach(({name, calls}) => {
        let macro = new Macro(name);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds', macro);
    });
}
