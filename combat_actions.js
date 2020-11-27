const {
    astralLocations,
    daggers,
    crewLocation,
    petLocation,
} = require('./locations');
const { HIT_DURATION } = require('./durations');
const { clickContinue, ensureClosed } = require('./ui_controls');
const { activateSkills } = require('./master_actions');

function tapAstrals (macro) {
    astralLocations.forEach(({ X, Y }) => {
        macro.addClick({ X, Y, duration: HIT_DURATION });
    });
    clickContinue(macro);
}

function tapDagger (macro, pos) {
    macro.addClick({...daggers[pos], duration: HIT_DURATION });
}

function tapCrew (macro) {
    macro.addClick({...crewLocation, duration: HIT_DURATION });
}

function tapPet (macro) {
    macro.addClick({...petLocation, duration: HIT_DURATION });
}

exports.tapFor = function (macro, time, skills = ['DS', 'HoM', 'FS', 'WC', 'SC']) {
    const startWait = macro.next;
    while ( macro.next - startWait < time ) {
        for ( let i = 0; i < daggers.length; i++) {
            activateSkills(macro, skills);
            tapAstrals(macro);
            tapDagger(macro, i);
            tapCrew(macro);
        }

        tapPet(macro);
        // Stupid map transition...
        ensureClosed(macro);
    }
}
