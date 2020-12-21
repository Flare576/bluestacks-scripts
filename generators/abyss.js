// This is an absolute mess because the last Abyss was nowhere near the same playstyle as the main game; will
// need dramatic rethinking if a macro is desired

const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const { tapFor } = require('../actions/combat_actions');
const {
    onePageOfHeroes,
    pagesOfHeroes,
    tapNineButtons,
} = require('../actions/hero_actions');
const { increaseSkills, prestige } = require('../actions/master_actions');
const { bookOfShadows, discoverArtifact, upgradeAbyss } = require('../actions/artifact_actions');
const { joinLeaveBoss } = require('../utilities/ui_controls');
const {
    pagePartialUp,
    pageDown,
    pageUp,
    ensureClosed,
} = require('../utilities/ui_controls');
const { WIN_DURATION, UI_DURATION } = require('../data/durations');
const config = require('../utilities/config');

function heroes (macro) {
    const pages = 4;
    macro.addKey('2', WIN_DURATION);
    for ( let i = 0; i < 1; i++) {
        pagePartialUp(macro);
        tapNineButtons(macro);
        pagePartialUp(macro);
        pageDown(macro, pages);
        for ( let i = 0; i <= pages; i++) {
            tapNineButtons(macro, true);
            pageUp(macro);
        }
    }
    ensureClosed(macro);
}

module.exports = () => {
    const spells = ['HoM','WC','DS','FS','SC'];
    [{
        name: 'Abyss - Re-Initialize Skills',
        calls: [
            { fn: increaseSkills, params: [false, spells] },
            { fn: tapFor, params: [10000, spells] },
            { fn: pagesOfHeroes, params: [3] },
            // { fn: tapFor, params: [10000, ['WC']] },
            // {fn: onePageOfHeroes},
            // { fn: tapFor, params: [10000, ['WC']] },
            // {fn: onePageOfHeroes},
            // { fn: tapFor, params: [10000, ['WC']] },
            // { fn: pagesOfHeroes, params: [2] },
            // { fn: tapFor, params: [10000, ['WC']] },
            // {fn: onePageOfHeroes},
            // { fn: tapFor, params: [10000, ['WC']] },
            // { fn: pagesOfHeroes, params: [2] },
        ],
    },{
        name: 'Abyss - Hero focus',
        calls: [
            {fn: tapFor, params: [10000, []]},
            {fn: onePageOfHeroes},
            {fn: tapFor, params: [10000, []]},
            { fn: pagesOfHeroes, params: [2] },
        ]
    },{
        name: 'Abyss - (180s) Attack Loop',
        calls: [
            {fn: tapFor, params: [10000, spells]},
            { fn: pagesOfHeroes, params: [2] },
            {fn: tapFor, params: [10000, spells]},
            {fn: onePageOfHeroes},
        ],
    },{
        name: 'Abyss - Level Up',
        calls: [
            {fn: increaseSkills, params: [true, ['DS', 'WC']]},
            {fn: tapFor, params: [60000]},
            /*
            {fn: increaseSkills, params: [true, ['DS']]},
            {fn: tapFor, params: [10000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['WC']]},
            {fn: tapFor, params: [10000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['FS']]},
            {fn: tapFor, params: [10000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['SC']]},
            {fn: tapFor, params: [10000]},
            {fn: onePageOfHeroes},
            {fn: increaseSkills, params: [true, ['HoM']]},
            {fn: tapFor, params: [10000]},
             */
        ],
    },{
        name: 'Abyss - Prestige',
        calls: [
            { fn: upgradeAbyss},
            //{ fn: discoverArtifact},
            { fn: bookOfShadows},
        ],
    }].forEach(({name, calls}) => {
        let macro = new Macro(name);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/abyss', macro);
    });
}
