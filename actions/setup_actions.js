const {
    safeTap,
    drops,
    fullScreenButton,
    masterLevel,
    heroUpgradeButtons,
    prestigePopup,
    prestigePopupEvent,
    prestigeConfirm,
    prestigeConfirmEvent,
    noThanks,
} = require('../data/locations');
const {
    accept,
    skip,
    save,
    mission,
    attack,
    smallMasterLevel,
    smallTopEquipButton,
    smallEquipmentCategories,
    topEquipButton,
    equipmentCategories,
    skillPointDrop,
    smallSkillTree,
    skillTree,
    introductionCTA,
    unlockButton,
    skillApply,
    closeSkills,
    prestigeModalCTA,
    smallPrestige,
    smallDiscover,
} = require('../data/setup_locations');
const {
    setMaxBuy,
    setHundredBuy,
    pagePartialUp,
    pageDown,
    pageUp,
} = require('../utilities/ui_controls');
const { tapNineButtons } = require('../actions/hero_actions');
const { HIT_DURATION, UI_DURATION, WIN_DURATION } = require('../data/durations');

exports.tapAccept = function (macro) { macro.addClick(accept); }
exports.tapSkip = function (macro) { macro.addClick(skip); }
exports.tapNoThanks = function (macro) { macro.addClick(noThanks); }
exports.tapMission = function (macro) { macro.addClick(mission); }

exports.tapSave = function (macro) { macro.addClick(save); macro.addClick(save); }
exports.tapDrop = function (macro) {
    // This interface is laggy
    macro.addClick(drops, WIN_DURATION);
    macro.addClick(drops, WIN_DURATION);
    macro.addClick(drops, WIN_DURATION);
    macro.addClick(drops, WIN_DURATION);
}
exports.tapAttack = function (macro, count) {
    const {X,Y} = attack;
    for(let i=0;i<count;i++) {
        !(i % 50) && exports.tapNoThanks(macro);
        const ox = (Math.random() * 2) - 1;
        const oy = (Math.random() * 4);

        macro.addClick({X: X+ox, Y: Y+oy}, HIT_DURATION);
    }
    exports.tapNoThanks(macro);
}

exports.setupSwordMaster = function (macro) {
    macro.addKey('1', UI_DURATION);
    macro.addClick(smallMasterLevel, UI_DURATION);
    macro.addClick(fullScreenButton, UI_DURATION);
    setMaxBuy(macro);
    macro.addKey('1');
}

exports.levelSwordMaster = function (macro) {
    macro.addKey('1', WIN_DURATION);
    macro.addClick(masterLevel);
    macro.addKey('1', WIN_DURATION);
}

exports.setupHeroes = function (macro) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro);
    tapNineButtons(macro, false);
    setMaxBuy(macro);
    macro.addKey('2', WIN_DURATION);
}

exports.quickHeroes = function (macro, tapTop = true) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro);
    // tap top four, then random
    let rando = [...heroUpgradeButtons];
    if (tapTop) {
        let top4 = rando.splice(0,4);
        top4.forEach(point => macro.addClick(point));
    }
    while(rando.length) {
        const randomIndex = Math.floor(Math.random() * rando.length);
        macro.addClick(rando.splice(randomIndex, 1)[0]);
    }
    macro.addKey('2', WIN_DURATION);
}

exports.setupEquipment = function (macro) {
    macro.addKey('3', WIN_DURATION);
    smallEquipmentCategories.forEach(cat => {
        macro.addClick(cat);
    });
    macro.addClick(smallTopEquipButton, WIN_DURATION);
    macro.addClick(fullScreenButton, WIN_DURATION);
    macro.addKey('3', WIN_DURATION);
}

exports.equipFirstItems = function (macro, small = false) {
    macro.addKey('3', WIN_DURATION);
    equipmentCategories.forEach(cat => {
        macro.addClick(cat, WIN_DURATION);
        macro.addClick(topEquipButton);
    });
    macro.addKey('3', WIN_DURATION);
}

exports.firstSkillPoint = function (macro) {
    // macro.addClick(skillPointDrop, WIN_DURATION);
    macro.addClick(safeTap, WIN_DURATION);
    macro.addKey('1', WIN_DURATION);
    macro.addClick(smallSkillTree, WIN_DURATION);
    macro.addClick(introductionCTA, WIN_DURATION);
    macro.addClick(unlockButton, WIN_DURATION);
    macro.addClick(skillApply, WIN_DURATION);
    macro.addClick(fullScreenButton, WIN_DURATION);
    macro.addKey('1', WIN_DURATION);
}

exports.useSkillPoints = function (macro) {
    macro.addClick(skillPointDrop, WIN_DURATION);
    macro.addClick(safeTap, WIN_DURATION);
    macro.addClick(safeTap, WIN_DURATION);
    macro.addKey('1', WIN_DURATION);
    macro.addClick(skillTree, WIN_DURATION);
    macro.addClick(unlockButton, WIN_DURATION);
    macro.addClick(skillApply, WIN_DURATION);
    macro.addClick(closeSkills, WIN_DURATION);
    macro.addKey('1', WIN_DURATION);
}

exports.firstArtifact = function (macro) {
    macro.addKey('5', WIN_DURATION);
    macro.addClick(smallDiscover, WIN_DURATION);
    macro.addClick(attack, WIN_DURATION); // open "present"
    macro.addClick(attack, WIN_DURATION); // yay
    macro.addClick(fullScreenButton, WIN_DURATION);
    macro.addKey('5', WIN_DURATION);
}


exports.firstPrestige = function (macro) {
    macro.addClick(prestigeModalCTA, WIN_DURATION);
    // During events
    macro.addClick(smallPrestige, WIN_DURATION);
    macro.addClick(prestigePopupEvent, WIN_DURATION);
    macro.addClick(prestigeConfirmEvent);
    // No Event
    macro.addClick(smallPrestige, WIN_DURATION);
    macro.addClick(prestigePopup, WIN_DURATION);
    macro.addClick(prestigeConfirm, 10000);

    macro.addClick(safeTap, 2000);
    macro.addClick(safeTap, 10000);
    macro.addClick(safeTap);
    macro.addClick(safeTap);
}

exports.slowThreePagesOfHeroes = function (macro) {
    const rev = [...heroUpgradeButtons].reverse();
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro);
    setMaxBuy(macro);
    pageDown(macro, 2);
    for (let i=0;i<2;i++) {
        rev.forEach(loc => macro.addClick(loc, 1500))
        pageUp(macro);
    }
    rev.forEach(loc => macro.addClick(loc, 1500))
    setHundredBuy(macro);
    macro.addKey('2', WIN_DURATION);
}
