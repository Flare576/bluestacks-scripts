const {
    astralLocations,
    astralLocationsLoot,
    daggers,
    crewLocation,
    petLocation,
} = require('../data/locations');
const { HIT_DURATION } = require('../data/durations');
const { clickCollect, ensureClosed } = require('../utilities/ui_controls');
const { activateSkills } = require('../actions/master_actions');
const config = require('../utilities/config');

function tapAstrals (macro) {
    const { tapEquipment } = config.get();
    astralLocations.forEach(({ X, Y }) => {
        macro.addClick({X, Y}, HIT_DURATION);
    });
    if (tapEquipment) {
        astralLocationsLoot.forEach(({ X, Y }) => {
            macro.addClick({X, Y}, HIT_DURATION);
        });
    }
    clickCollect(macro);
}

function tapDagger (macro, pos) {
    macro.addClick({...daggers[pos]}, HIT_DURATION);
}

function tapCrew (macro) {
    macro.addClick({...crewLocation}, HIT_DURATION);
}

function tapPet (macro) {
    macro.addClick({...petLocation}, HIT_DURATION);
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
