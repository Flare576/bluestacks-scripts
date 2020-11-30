const { allSkills, masterLevel } = require('./locations');
const { pageUp, ensureClosed } = require('./ui_controls');

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
    macro.addKey('1', 2000);
    macro.addClick({ X: 83.24, Y: 28.89 }, 2000);
    macro.addClick({ X: 49.71, Y: 88.50 }, 2000);
    macro.addClick({ X: 68.34, Y: 72.81 }, 15000);
    // macro.addClick({ X: 49.71, Y: 91.01 }, 2000 ); // Event 2nd buton
    // macro.addClick({ X: 71.18, Y: 75.04 }, 10000 ); // Event 3rd button
    // macro.addClick({ X: 49.71, Y: 81.46 }, 2000 ); // Normal 2nd buton
    // macro.addClick({ X: 67.94, Y: 67.72 }, 10000 ); // Normal 3rd button
    // Might see a warning about equipment; clicky!
    macro.addClick({ X: 50.88, Y: 65.81 });

    // 2nd button during Event?: middle: [49.51, 91.15], top: [49.51, 87.86], bottom[49.51, 93.76]
    // Last button during Event?: middle: [68.26, 75.54], top: [67.26, 72.51], bottom[69.26, 77.88]
    // Last button during wtf: middle: [68.34,71.4], top: [68.34,68.48], bottom: [68.34,74.01]
}
