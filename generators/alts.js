/*
    Note: This is a bit of a work-in-progress, and so isn't as well formatted as it could be.
*/
const config = require('../utilities/config');
const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const { ensureClosed, joinLeaveBoss } = require('../utilities/ui_controls');
const { prestige, activateSkills, increaseSkills } = require('../actions/master_actions');
const { discoverArtifact, upgradeAll } = require('../actions/artifact_actions');
const { onePageOfHeroes } = require('../actions/hero_actions');
const {
    tapAccept,
    tapSkip,
    tapSave,
    tapDrop,
    tapAttack,
    setupSwordMaster,
    levelSwordMaster,
    setupHeroes,
    quickHeroes,
    setupEquipment,
    equipFirstItems,
    firstSkillPoint,
    firstPrestige,
    firstArtifact,
    useSkillPoints,
    slowThreePagesOfHeroes,
} = require('../actions/setup_actions');

function fillStart (macro) {
    const increase = 1.02;
    let attacks = 100;
    let spells = [];
    const ongoing = (macro, loops, joinLeave = false) => {
        for(let i=0; i<loops; i++) {
            attacks *= increase;
            tapAttack(macro, attacks);
            joinLeave && joinLeaveBoss(macro);
            if (i % 3 === 0) {
                levelSwordMaster(macro);
            } else {
                quickHeroes(macro, i % 2);
            }
            ensureClosed(macro);
            activateSkills(macro, spells);
        }
    }

    // Pregame
    tapAccept(macro);
    macro.sleep(20000);
    tapSkip(macro);
    macro.sleep(1000);
    tapSkip(macro);
    macro.sleep(5500);
    tapSave(macro);

    // First missions
    tapAttack(macro, 200);
    setupSwordMaster(macro);

    // Hero can trigger before we get a chance to upgrade Master... let it!
    tapAttack(macro, 350);
    setupHeroes(macro);
    tapAttack(macro, 250);
    levelSwordMaster(macro); // lvl 5
    tapAttack(macro, 200);
    levelSwordMaster(macro); // lvl 10

    tapAttack(macro, 200);
    quickHeroes(macro, true); // 180G, top hero
    ongoing(macro, 10, true); //stage 16, 800G hero
    tapDrop(macro);
    setupEquipment(macro);
    tapAttack(macro, 400);
    quickHeroes(macro, true); // 4K G, top hero
    // failed @ 20...
    // After initial missions
    // reach stage 20! well, 25-30
    ongoing(macro, 13, true); // exit @ 11:50
    tapAttack(macro, 400); // note: lvl 100 hit here, could get HS
    quickHeroes(macro, true); // 28K G, top hero

    // By this point we could be anywhere between stage 29 and 35 :/
    ongoing(macro, 5, true); // get Master to 100!
    spells = ['HS']; // @ 14:05
    increaseSkills(macro, false, spells);

    // Reach 36! probably overkill! (I was on 36 before the rotation)
    ongoing(macro, 8, true);
    tapDrop(macro); // @ 17:26
    equipFirstItems(macro);

    // Get Master to lvl 150
    ongoing(macro, 7, true);
    spells = ['DS']; // @ 20:48
    increaseSkills(macro, false, spells);

    ongoing(macro, 4); // Push a bit w/ balance (maybe around 45-49?)
    tapAttack(macro, 400); // @ 22:45
    quickHeroes(macro, true); // 22.4M G, top hero

    // couldn't beat 50-51 boss
    // stage 51 for skill point
    ongoing(macro, 14, true);
    firstPrestige(macro); // @ 32:45

    firstSkillPoint(macro);
    firstArtifact(macro);
}

function fillLoop (macro) {
    const innerLoop = (macro) => {
        const taps = (macro) => {
            activateSkills(macro, ['WC']);
            tapAttack(macro, 1000);
        }
        taps(macro);
        levelSwordMaster(macro);
        taps(macro);
        onePageOfHeroes(macro, true);
        taps(macro);
        onePageOfHeroes(macro, false);
        ensureClosed(macro);
    }
    innerLoop(macro);
    slowThreePagesOfHeroes(macro);
    ensureClosed(macro);
    innerLoop(macro);
}

function fillPrestige (macro) {
    prestige(macro);
    tapDrop(macro);
    equipFirstItems(macro);
    ensureClosed(macro);
    useSkillPoints(macro);
    discoverArtifact(macro);
    upgradeAll(macro, 3, 2);
}

module.exports = () => {
    config.set({ useFairies: true });
    [
        { name: 'Alt+F - Start', fn: fillStart },
        { name: 'Alt+F - 10m Loop', fn: fillLoop },
        { name: 'Alt+F - Prestige', fn: fillPrestige },
    ].forEach(({name, fn}) => {
        const macro = new Macro(name);
        fn(macro);
        writeIt('alt/fairy', macro);
    });

    config.set({ useFairies: false });
    [
        { name: 'Alt - Start', fn: fillStart },
        { name: 'Alt - 10m Loop', fn: fillLoop },
        { name: 'Alt - Prestige', fn: fillPrestige },
    ].forEach(({name, fn}) => {
        const macro = new Macro(name);
        fn(macro);
        writeIt('alt/no-fairy', macro);
    });
}
