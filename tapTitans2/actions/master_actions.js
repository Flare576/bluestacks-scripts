const {
    allSkills,
    masterLevel,
    prestigeButton,
    prestigePopup,
    prestigePopupEvent,
    prestigeConfirm,
    prestigeConfirm2,
    prestigeConfirmEvent,
} = require('../data/locations');
const { WIN_DURATION } = require('../../common/data/durations');
const { pageUp, ensureClosed } = require('../actions/ui_controls');

exports.increaseSkills = function (macro, max = false, skills = ['DS', 'HoM', 'FS', 'WC', 'SC']) {
    const { levelUp } = allSkills;
    macro.addKey('1');
    pageUp(macro);
    // Level up Sword Dude
    macro.addClick(masterLevel);

    skills.forEach(skill => {
        const Y = levelUp[skill];
        macro.addClick({ X: levelUp.oneX, Y });
        if(max) {
            macro.addClick({ X: levelUp.oneX, Y });
            macro.addClick({ X: levelUp.maxX, Y });
        }
    });
    ensureClosed(macro);
}

exports.activateSkills = function (macro, skills) {
    const { activate } = allSkills;
    const { Y } = activate;
    skills.forEach(skill => {
        macro.addClick({ X: activate[skill], Y });
    });
}

exports.activateAllSkills = function (macro) {
    activateSkills(['DS', 'HoM', 'WC', 'SC']);
}

// TODO: this is still clunky
exports.prestige = function (macro) {
    // Normal
    macro.addKey('1', 2000);
    macro.addClick(prestigeButton, WIN_DURATION);
    macro.addClick(prestigePopupEvent, WIN_DURATION);
    macro.addClick(prestigeConfirmEvent, WIN_DURATION);

    ensureClosed(macro);

    // No idea why the above misses
    macro.addKey('1', 2000);
    macro.addClick(prestigeButton, WIN_DURATION);
    macro.addClick(prestigePopup, WIN_DURATION);
    macro.addClick(prestigeConfirm, WIN_DURATION);
    macro.addClick(prestigeConfirm2, 10000);

    // Might see a warning about equipment; clicky!
    macro.addClick({ X: 50.88, Y: 65.81 });
}
