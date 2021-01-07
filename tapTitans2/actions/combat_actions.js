const {
    astralLocations,
    astralLocationsLoot,
    daggers,
    crewLocation,
    petLocation,
    fairyAttack,
} = require('../data/locations');
const { HIT_DURATION, UI_DURATION, WIN_DURATION } = require('../../common/data/durations');
const { ensureClosed, fairyPopup } = require('../actions/ui_controls');
const { activateSkills } = require('../actions/master_actions');
const config = require('../../common/utilities/config');

function inFairyRange (yCoord) {
    return yCoord < 35;
}

function tapAstrals (macro, index) {
    const { tapEquipment, astralNoFairy } = config.get();
    const preFilter = [...astralLocations];
    if (tapEquipment) {
        astralLocationsLoot.forEach(loc => preFilter.push(loc));
    }

    const relevant = preFilter.filter(loc => !(astralNoFairy && inFairyRange(Y)));
    if (index !== undefined) {
        const { X, Y } = relevant[index % relevant.length];
        macro.addClick({X, Y}, HIT_DURATION);
        if (!(index % relevant.length)) {
            fairyPopup(macro);
        }
    } else {
        relevant.forEach(({ X, Y }) => {
            macro.addClick({X, Y}, HIT_DURATION);
        });
        fairyPopup(macro);
    }
}

function getDaggers () {
    const { daggerCount = 5 } = config.get();
    return daggers[daggerCount];
}

function tapDagger (macro, pos) {
    const coords = getDaggers();
    const idx = pos % coords.length;
    macro.addClick({...coords[idx]}, HIT_DURATION);
}

function tapDaggers (macro, delay = UI_DURATION) {
    const coords = getDaggers();
    coords.forEach(d => macro.addClick(d, delay));
}

function tapCrew (macro) {
    macro.addClick({...crewLocation}, HIT_DURATION);
}

exports.tapPet = function (macro) {
    macro.addClick({...petLocation}, HIT_DURATION);
}

exports.abyssTap = function (macro, time, skills = ['DS', 'HoM', 'FS', 'WC', 'SC']) {
    const startWait = macro.next;
    let daggersIdx = 0;
    while ( macro.next - startWait < time ) {
        activateSkills(macro, skills);
        tapAstrals(macro);
        fairyPopup(macro);
        tapDagger(macro, daggersIdx++);
        tapCrew(macro);

        exports.tapPet(macro);
        // for(let j=0;j<50;j++) {
        //     macro.addClick(fairyAttack, HIT_DURATION);
        // }
    }
}

exports.tapFor = function (macro, time, skills = ['DS', 'HoM', 'FS', 'WC', 'SC'], astralInject) {
    const startWait = macro.next;
    const daggerCoords = getDaggers();
    while ( macro.next - startWait < time ) {
        let i = 0;
        while (i < daggerCoords.length * 2) {
            activateSkills(macro, skills);
            tapDagger(macro, i++);
            tapAstrals(macro, astralInject);
            tapDagger(macro, i++);
            tapCrew(macro);
        }

        exports.tapPet(macro);
        // Stupid map transition...
        ensureClosed(macro);
    }
}

exports.petTapFor = function (macro, time) {
    const start = macro.next;
    while (macro.next - start < time) {
        exports.tapPet(macro);
        activateSkills(macro, ['FS', 'WC']);
        for(let i=0;i<10;i++) {
            for(let j=0;j<50;j++) {
                macro.addClick(fairyAttack, HIT_DURATION);
            }
            fairyPopup(macro);
        }
    }
}

function tapHS (macro) {
    fairyPopup(macro);
    activateSkills(macro, ['HS']);
}


exports.hsTapFor = function (macro, time) {
    const start = macro.next;
    const jobs = [
        { name: 'Skills', idx: 0, last: 0, cadence: 1000, fn (macro) {
            const skills = ['SC', 'DS', 'HoM', 'FS', 'WC'];
            this.last = macro.next;
            activateSkills(macro, [skills[this.idx++ % skills.length]]);
        }},
        { name: 'Fairy', idx: 0, last: 0, cadence: 5000, fn (macro) {
            this.idx++; // Not currently utilized, but defined for consistency
            this.last = macro.next;
            fairyPopup(macro);
        }},
        { name: 'HeavenlyStrike', idx: 0, last: 0, cadence: 500, fn (macro) {
            this.idx++; // Not currently utilized, but defined for consistency
            this.last = macro.next;
            activateSkills(macro, ['HS']);
        }},
        { name: 'Daggers', idx: 0, last: 0, cadence: 1000, fn (macro) {
            this.last = macro.next;
            tapDagger(macro, this.idx++);
        }},
        { name: 'Crew', idx: 0, last: 0, cadence: 4000, fn (macro) {
            this.idx++; // Not currently utilized, but defined for consistency
            this.last = macro.next;
            tapCrew(macro);
        }},
        { name: 'Astrals', idx: 0, last: 0, cadence: 0, fn (macro) {
            this.last = macro.next;
            tapAstrals(macro, this.idx++);
        }},
    ];
    while (macro.next - start < time) {
        const executed = jobs.find(job => {
            if (job.last === 0 || macro.next > job.last + job.cadence) {
                job.fn(macro);
                return true;
            }
        });
        // We must run something or we'll never add to macro, therefore we'll never bump time and loop forver
        // lowest priority is considered "default"
        if (!executed) {
            console.log('failed to run a job');
            jobs[jobs.length - 1].fn(macro);
        }
    }
}
