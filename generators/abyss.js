const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const { tapFor } = require('../actions/combat_actions');
const { onePageOfHeroes, twoPagesOfHeroes, pagesOfHeroes } = require('../actions/hero_actions');
const { increaseSkills, prestige } = require('../actions/master_actions');
const { bookOfShadows, discoverArtifact, upgradeAll } = require('../actions/artifact_actions');
const { joinLeaveBoss } = require('../utilities/ui_controls');

module.exports = () => {
    [{
        name: 'Abyss - Re-Initialize Skills',
        calls: [
            { fn: increaseSkills },
            { fn: tapFor, params: [10000, ['WC']] },
            {fn: onePageOfHeroes},
            { fn: tapFor, params: [10000, ['WC']] },
            {fn: onePageOfHeroes},
            { fn: tapFor, params: [10000, ['WC']] },
            { fn: pagesOfHeroes, params: [2] },
            { fn: tapFor, params: [10000, ['WC']] },
            {fn: onePageOfHeroes},
            { fn: tapFor, params: [10000, ['WC']] },
            { fn: pagesOfHeroes, params: [2] },
        ],
    },{
        name: 'Abyss - (180s) Attack Loop',
        calls: [
            {fn: tapFor, params: [10000, ['WC','DS']]},
            {fn: joinLeaveBoss},
            {fn: onePageOfHeroes},
            {fn: tapFor, params: [10000, ['WC','DS']]},
            {fn: joinLeaveBoss},
            {fn: pagesOfHeroes, params: [2]},
            {fn: tapFor, params: [10000, ['WC','DS']]},
            {fn: joinLeaveBoss},
            {fn: onePageOfHeroes},
            {fn: tapFor, params: [25000, ['WC','DS']]},
            {fn: joinLeaveBoss},
            { fn: pagesOfHeroes, params: [3, true]},
        ],
    },{
        name: 'Abyss - Level Up',
        calls: [
            { fn: increaseSkills, params: [true, ['WC', 'DS']]},
        ],
    },{
        name: 'Abyss - Prestige',
        calls: [
            {fn: prestige},
            {fn: discoverArtifact},
            {fn: upgradeAll, params: [2, 1]},
        ],
    }].forEach(({name, calls}) => {
        let macro = new Macro(name);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/abyss', macro);
    });
}
