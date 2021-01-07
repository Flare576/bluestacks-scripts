// This is an absolute mess because the last Abyss was nowhere near the same playstyle as the main game; will
// need dramatic rethinking if a macro is desired

const { writeIt } = require('../../common/utilities/file_tools');
const Macro = require('../../common/utilities/macro');
const { tapFor } = require('../actions/combat_actions');
const {
    onePageOfHeroes,
    pagesOfHeroes,
    tapNineButtons,
    spamHeroes,
} = require('../actions/hero_actions');
const { increaseSkills, prestige } = require('../actions/master_actions');
const { bookOfShadows, discoverArtifact, upgradeAbyss } = require('../actions/artifact_actions');
const {
    pagePartialUp,
    pageDown,
    pageUp,
    ensureClosed,
    joinLeaveBoss,
} = require('../actions/ui_controls');
const { abyssTap } = require('../actions/combat_actions');
const { WIN_DURATION, UI_DURATION } = require('../../common/data/durations');
const config = require('../../common/utilities/config');

module.exports = () => {
    const spells = ['WC','DS','HoM','SC'];
    [{
        name: 'Abyss - Prestige',
        calls: [{fn: prestige}],
            //{ fn: upgradeAbyss},
            //{ fn: discoverArtifact},
            //{ fn: bookOfShadows},
    },{
        name: 'Abyss - Artifacts',
        calls: [{ fn: upgradeAbyss}],
    },{ name: 'Abyss - Early',
        calls: [
            { fn: abyssTap, params: [20000, spells] },
            { fn: spamHeroes, params: [20000, 2] },
        ],
    },{ name: 'Abyss - Quick Init',
        calls: [
            { fn: increaseSkills, params: [false, spells] },
        ],
    },{ name: 'Abyss - Max Good Spells',
        calls: [
            { fn: increaseSkills, params: [true, ['WC', 'DS']] },
        ],
    },{ name: 'Abyss - Late',
        calls: [
            { fn: abyssTap, params: [20000, spells] },
            // { fn: joinLeaveBoss },
            { fn: spamHeroes, params: [20000, 2] },
            // { fn: joinLeaveBoss },
        ],
    },{ name: 'Abyss - End',
        calls: [
            { fn: abyssTap, params: [30000, spells] },
            { fn: pagesOfHeroes, params: [2, false] },
            { fn: abyssTap, params: [30000, spells] },
            { fn: pagesOfHeroes, params: [2, true] },
        ],
    }].forEach(({name, calls}) => {
        const { tapEquipment} = config.get();
        config.set({ tapEquipment: true });
        let macro = new Macro(name);
        calls.forEach(({fn, params = []}) => fn(macro, ...params));
        writeIt('builds/abyss', macro);
        config.set({ tapEquipment });
    });
}
