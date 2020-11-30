/*
    Note: This is a bit of a work-in-progress, and so isn't as well formatted as it could be.
*/
const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const { ensureClosed } = require('../utilities/ui_controls');
const { activateSkills, increaseSkills } = require('../actions/master_actions');
const { twoPagesOfHeroes } = require('../actions/hero_actions');
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
    tapRejoin,
    useSkillPoints,
} = require('../actions/setup_actions');

let attacks = 100;
const increase = 1.02;
let spells = [];
const ongoing = (macro, loops) => {
    for(let i=0; i<loops; i++) {
        attacks *= increase;
        tapAttack(macro, attacks);
        if (i % 3 === 0) {
            levelSwordMaster(macro);
        } else {
            quickHeroes(macro, i % 2);
        }
        ensureClosed(macro, false);
        activateSkills(macro, spells);
    }
}

module.exports = () => {
    let macro = new Macro('Alt - Start');

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

    // testing
    tapAttack(macro, 200);
    quickHeroes(macro, true); // 180G, top hero
    ongoing(macro, 10); //stage 16, 800G hero
    tapDrop(macro);
    setupEquipment(macro);
    tapAttack(macro, 400);
    quickHeroes(macro, true); // 4K G, top hero

    // After initial missions
    // reach stage 20! well, 25-30
    ongoing(macro, 13); // exit @ 11:50
    tapAttack(macro, 400); // note: lvl 100 hit here, could get HS
    quickHeroes(macro, true); // 28K G, top hero

    // By this point we could be anywhere between stage 29 and 35 :/
    ongoing(macro, 5); // get Master to 100!
    spells = ['HS']; // @ 14:05
    increaseSkills(macro, false, spells);

    // Reach 36! probably overkill! (I was on 36 before the rotation)
    ongoing(macro, 8);
    tapDrop(macro); // @ 17:26
    equipFirstItems(macro);

    // Get Master to lvl 150
    ongoing(macro, 7);
    spells = ['DS']; // @ 20:48
    increaseSkills(macro, false, spells);

    ongoing(macro, 4); // Push a bit w/ balance (maybe around 45-49?)
    tapAttack(macro, 400); // @ 22:45
    quickHeroes(macro, true); // 22.4M G, top hero

    // couldn't beat 50-51 boss
    // stage 51 for skill point
    ongoing(macro, 4);
    // assumption: we're stuck on 50.
    tapRejoin(macro); // @ 27:35, barely missed boss
    ongoing(macro, 10);
    firstPrestige(macro); // @ 32:45

    firstSkillPoint(macro);
    firstArtifact(macro);

    writeIt('alt', macro);

    const taps = (macro) => {
        tapAttack(macro, 200);
        activateSkills(macro, ['DS']);
    }
    const innerLoop = (macro) => {
        taps(macro);
        levelSwordMaster(macro);
        taps(macro);
        quickHeroes(macro, true);
        taps(macro);
        quickHeroes(macro, false);
        ensureClosed(macro, false);
    }
    macro = new Macro('Alt - Loop');
    for(let i=0;i<3;i++) innerLoop(macro);
    tapDrop(macro);
    equipFirstItems(macro);
    increaseSkills(macro);
    useSkillPoints(macro);
    twoPagesOfHeroes(macro);
    ensureClosed(macro);
    writeIt('alt', macro);
}
