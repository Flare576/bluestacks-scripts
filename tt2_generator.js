/*
Rules: X/Y coords MUST have at least 1 decimal place
MouseDown and first MouseMove must NOT have same values on a drag
*/
/* Buy Set button bounding box
85.89, 26.01   97.86, 24.51
  _________________
  |               |
  |               |
  |_______________|
86.01, 31.21   98,75, 31.33
*/
/* Equipment drop bounding box:
63.91, 43.98   87.02, 44.3
  _________________
  |               |
  |               |
  |_______________|
66.4, 53.69    87.02,54.57
*/
const fs = require('fs');
const allSkills = {
    activate: {
        HS: 8.09,
        DS: 25.01,
        HoM: 41.47,
        FS: 58.09,
        WC: 75.01,
        SC: 91.32,
        Y: 89.55,
    },
    levelUp: {
        HS: 39.33,
        DS: 48.33,
        HoM: 57.33,
        FS: 66.33,
        WC: 75.33,
        SC: 84.35,
        oneX: 83.55,
        maxX: 58.93,
    },
};
const astralLocations = [
    { X: 3.69, Y: 23.19 },
    { X: 12.41, Y: 22.91 },
    { X: 24.29, Y: 20.08 },
    { X: 22.11, Y: 24.88 },
    { X: 16.08, Y: 28.09 },
    { X: 10.55, Y: 28.18 },
    { X: 2.18, Y: 27.62 },
    { X: 1.17, Y: 33.93 },
    { X: 7.71, Y: 38.36 },
    { X: 11.73, Y: 35.06 },
    { X: 15.91, Y: 37.42 },
    { X: 20.11, Y: 39.4 },
    { X: 26.63, Y: 48.92 },
    { X: 20.61, Y: 47.5 },
    { X: 14.74, Y: 48.73 },
    { X: 10.72, Y: 46.47 },
    { X: 4.36, Y: 47.13 },
    { X: 86.77, Y: 12.44 },
    { X: 79.73, Y: 17.34 },
    { X: 95.14, Y: 15.93 },
    { X: 96.31, Y: 18.28 },
    { X: 93.31, Y: 21.02 },
    { X: 86.93, Y: 21.21 },
    { X: 30.32, Y: 73.14 },
    { X: 78.39, Y: 23.19 },
    { X: 78.22, Y: 23.19 },
    { X: 98.65, Y: 26.71 },
    // { X: 91.46, Y: 26.58 }, // Under button 1
    // { X: 86.93, Y: 28.09 }, // Under button 1
    { X: 82.58, Y: 27.24 },
    { X: 96.98, Y: 35.91 },
    { X: 87.94, Y: 38.08 },
    { X: 84.25, Y: 36.48 },
    { X: 96.15, Y: 46.65 },
    // { X: 89.78, Y: 48.44 }, // Too close to loot
    // { X: 82.91, Y: 49.29 }, // Too close to loot
    // { X: 77.55, Y: 46.65 }, // Too close to loot
    // { X: 71.36, Y: 49.48 }, // Too close to loot
];

const UI_DURATION = 250;
const WIN_DURATION = 1000;
const HIT_DURATION = 20;

let next;
let action;

function newAction (Name) {
    const TimeCreated = new Date().toISOString().replace(/[^\dT]/g, "").substring(0,15);
    next = 1000;
    action = {
        TimeCreated,
        Name,
        Events: [],
        LoopType: "TillLoopNumber",
        LoopNumber: 1,
        LoopTime: 0,
        LoopInterval: 0,
        Acceleration: "1.0",
        PlayOnStart: false,
        DonotShowWindowOnFinish: false,
        RestartPlayer: false,
        RestartPlayerAfterMinutes: 60,
        ShortCut: "",
        UserName: "",
        MacroId: "",
    };
}

function addEvent ({ duration = 50, ...rest }) {
    action.Events.push({...rest, Timestamp: next})
    next += duration;
}

function sleep (duration = 0) {
    // Sleeping for long durations seems like it might stop the macro.... limit to 10s
    let start = next;
    while (next - start < duration) {
        generateOneKey('4');
        generateOneKey('4');
        const passed = next - start;
        const left = Math.max(0, duration - (next - start))
        next += Math.min(10000, left);
    }
}

function generateOneKey (KeyName, duration = UI_DURATION) {
    addEvent({ KeyName, EventType: 'KeyDown' });
    addEvent({ KeyName, EventType: 'KeyUp', duration });
}

function generateOneClick ({ duration = UI_DURATION, Delta = 0, ...rest }){
    addEvent({ ...rest, Delta, EventType: 'MouseDown' });
    addEvent({ ...rest, Delta, EventType: 'MouseUp', duration });
}

        // generateDrag({X: 49, Y: 16.27}, {X: 49, Y:93.88});
function generateDrag ({ X: startX, Y: startY }, { X: endX, Y: endY }) {
    const Delta = 0;
    addEvent({
        X: startX,
        Y: startY,
        Delta,
        EventType: 'MouseDown',
    });
    const xD = endX - startX; // 0
    const yD = endY - startY; // -77
    const scale = 1;
    let xFactor, yFactor;
    if (xD && yD) {
        xFactor = xD / yD * scale;
        yFactor = yD / xD * scale;
    } else {
        xFactor = xD < 0 ? -(scale) : xD && scale;
        yFactor = yD < 0 ? -(scale) : yD && scale;
    }

    const steps = Math.floor(Math.max(Math.abs(yD), Math.abs(xD))) / scale; // 77 / .1 = 770
    for ( let i = 1; i < steps; i++) {
        const X = +(startX + (i * xFactor)).toFixed(2);
        const Y = +(startY + (i * yFactor)).toFixed(2);
        addEvent({
            duration: 6,
            X,
            Y,
            Delta,
            EventType: 'MouseMove',
        });
    };
    addEvent({
        duration: 1000, // Prevent "toss" effect
        X: endX,
        Y: endY,
        Delta,
        EventType: 'MouseMove',
    });
    addEvent({
        duration: 1000, // Let the "edge bounce" settle
        X: endX,
        Y: endY,
        Delta,
        EventType: 'MouseUp',
    });
}

function clickContinue () {
    generateOneClick({ X: 71.11, Y: 73.11, duration: HIT_DURATION});
}

function generateClickFairies() {
    // Fairies fly along Y: 22/23 from X:12 to X:98
    // Every fairy could possibly trigger a "Continue"/"View Ad" window
    // Assume user has paid version, click "continue" button between each fairy click attempt
    // Should take ~2 secs to go full distance
    // click every 1 X values, total of 86 clicks, or 43/s
    let Y = 22.5;
    for (let X = 13.1; X < 98; X += 1) {
        generateOneClick({X, Y, duration: HIT_DURATION});
        clickContinue();
    }
    clickContinue();
}

function activateSkills(skills) {
    const { activate } = allSkills;
    const { Y } = activate;
    skills.forEach(skill => {
        generateOneClick({ X: activate[skill], Y });
    });
}

function activateAllSkills() {
    activateSkills(['DS', 'HoM', 'WC', 'SC']);
}

function pagePartialUp(depth = 1) {
    for (let i = 0; i < depth; i++) {
        generateDrag({X: 49.21, Y: 16.27}, {X: 49.21, Y: 50.88});
    }
}

function pageUp(depth = 1) {
    for (let i = 0; i < depth; i++) {
        generateDrag({X: 49.21, Y: 16.27}, {X: 49.21, Y: 93.88});
    }
}

function pageDown(depth = 1) {
    for (let i = 0; i < depth; i++) {
        generateDrag({X: 49.21, Y: 93.88}, {X: 49.21, Y: 21.27});
    }
}

function ensureEnlarged() {
    // Take your time with this shit
    generateOneKey('1', WIN_DURATION); // random window
    generateOneKey('2', WIN_DURATION); // window we care about
    pageUp();
    generateOneClick({X: 80.71, Y: 54.42 }); // Either the full screen button or nothing important
    generateOneKey('2', WIN_DURATION); // close
}

function ensureHeroMaxBuy() {
    generateOneKey('2', WIN_DURATION);
    generateOneClick({ X: 84.31, Y: 8.43 });
    generateOneClick({ X: 9.84, Y: 8.51 });
    generateOneKey('2', WIN_DURATION);
}

// Only way I know how to do this is to wait for potential boss timer to expire
function ensureNotWaitingForBoss() {
    sleep(90000);
    generateOneKey('B');
}

function tapNineButtons(reversed) {
    // we actually tap 18 times, juuuust in case
    // the screen is off a bit
    const X = 83.38;
    let start = 87.65;
    let inc = 4.5;
    if (reversed) {
        start = 15.65;
        inc = -9;
    }
    for ( let i = 0; i < 18; i++) {
        const Y = +(start - (inc * i)).toFixed(2);
        generateOneClick({ X, Y, duration: UI_DURATION / 2 });
    }
}

function ensureClosed() {
    generateOneKey('2');
    generateOneKey('4');
    generateOneKey('4');
}

function onePageOfHeroes(reversed) {
    generateOneKey('2', WIN_DURATION);
    pagePartialUp();
    tapNineButtons(reversed);
    ensureClosed();
}

function twoPagesOfHeroes(reversed) {
    generateOneKey('2', WIN_DURATION);
    pagePartialUp(); // Help ensure we line up with the taps
    pageDown();
    tapNineButtons();
    pageUp();
    tapNineButtons();
    ensureClosed();
}

// mode: manic, normal, safe
// manic: Keep all skills up, tap all astral
// normal: Keep cheap skills up, tap all astral
// safe: Keep cheap skills up, skip unsafe astral
function tapFor(time, mode, skills = ['HoM', 'SC']) {
    mode === 'manic' && skills.push('DS', 'WC');
    const daggerDuration = mode === 'manic' ? HIT_DURATION : 1000;

    const startWait = next;
    while ( next - startWait < time ) {
        // Desired skills
        activateSkills(skills);
        // Crew
        generateOneClick({ X: 36.59, Y: 49.63, duration: HIT_DURATION });
        // Pet
        // generateOneClick({ X: 58.84, Y: 48.44, duration: HIT_DURATION });
        generateOneClick({ X: 52.92, Y: 48.64, duration: HIT_DURATION });
        // Astral Awakening
        for (let i = 0; i < 2; i++) {
            astralLocations.forEach(({ X, Y }) => {
                if ( Y > 35 || mode !== 'safe' ) {
                    generateOneClick({ X, Y, duration: HIT_DURATION });
                }
            });
            // Twice just to be sure; the above taps go FAST
            clickContinue();
            clickContinue();
        }
        // Daggers
        generateOneClick({ X: 34.66, Y: 40.13, duration: daggerDuration });
        generateOneClick({ X: 42.08, Y: 40.13, duration: daggerDuration });
        generateOneClick({ X: 49.64, Y: 40.77, duration: daggerDuration });
        generateOneClick({ X: 57.35, Y: 39.89, duration: daggerDuration });
        generateOneClick({ X: 64.48, Y: 39.09, duration: daggerDuration });
    }
}

// skills: see "allSkills" above
function increaseSkills (max = false, skills = ['DS', 'HoM', 'WC', 'SC']) {
    const { levelUp } = allSkills;
    generateOneKey('1');
    pageUp();
    // Level up Sword Dude
    generateOneClick({ X: 84.11, Y: 16.06 });

    skills.forEach(skill => {
        const Y = levelUp[skill];
        generateOneClick({ X: levelUp.oneX, Y });
        if(max) {
            // Need to handle if above canceled active skill
            generateOneClick({ X: levelUp.oneX, Y });
            generateOneClick({ X: levelUp.maxX, Y });
        }
    });
    generateOneKey('1', WIN_DURATION);
}

function manic60s () {
    onePageOfHeroes();
    tapFor(50000, 'manic');
    sleep(2000); // visible loop marker
}

function normal60s (skills) {
    onePageOfHeroes();
    tapFor(50000, 'normal', skills);
    sleep(2000); // visible loop marker
}

function safe60s (skills) {
    onePageOfHeroes();
    tapFor(50000, 'safe', skills);
    sleep(2000); // visible loop marker
}

function splitLoop (skills) {
    generateClickFairies();
    activateAllSkills();
    onePageOfHeroes(true);
    tapFor(60000, 'normal', skills);
    onePageOfHeroes(true);
    tapFor(45000, 'safe', skills);
}

function midLoop () {
    const skills = ['HoM', 'WC', 'SC'];
    activateSkills(skills);
    splitLoop(skills);
}

function lateLoop () {
    const skills = ['HoM','SC'];
    activateSkills(skills);
    splitLoop(skills);
}

function prestige () {
    generateOneKey('1', 2000);
    generateOneClick({ X: 83.24, Y: 28.89, duration: 2000});
    generateOneClick({ X: 49.71, Y: 87.41, duration: 2000 }); // wtf? 2nd button
    generateOneClick({ X: 68.34, Y: 71.41, duration: 2000 }); // wtf? 3nd button
    // generateOneClick({ X: 49.71, Y: 91.01, duration: 2000 }); // Event 2nd buton
    // generateOneClick({ X: 71.18, Y: 75.04, duration: 10000 }); // Event 3rd button
    // generateOneClick({ X: 49.71, Y: 81.46, duration: 2000 }); // Normal 2nd buton
    // generateOneClick({ X: 67.94, Y: 67.72, duration: 10000 }); // Normal 3rd button
    // Might see a warning about equipment; clicky!
    generateOneClick({ X: 50.88, Y: 65.81 });

    // Last button during wtf: middle: [68.34,71.4], top: [68.34,68.48], bottom: [68.34,74.01]
}

function bookOfShadows () {
    generateOneKey('5');
    for ( let i = 0; i < 6; i++) {
        generateOneClick({ X: 84.26, Y: 28.71 });
    }
    generateOneKey('5');
}

const outputPath = '/mnt/c/Users/Flare576/Documents/TT2_Macros';
// const outputPath = './macros';

let macros = [{
    name: '1 Initialize Skills',
    calls: [
        { fn: ensureEnlarged, },
        { fn: ensureHeroMaxBuy },
        { fn: increaseSkills },
        { fn: manic60s },
        { fn: twoPagesOfHeroes },
    ],
},{
    name: '2.2 Normal Loop 60s (HoM+SC)',
    calls: [ {fn: normal60s, params: [['HoM', 'SC']]} ],
},{
    name: '2.1 Manic Loop 60s',
    calls: [{fn: manic60s}],
},{
    name: '2.2 Normal Loop 60s (HoM+SC)',
    calls: [{fn: normal60s, parms: [['HoM', 'SC']]}],
},{
    name: '2.3 Safe Loop 60s (HoM+SC)',
    calls: [{fn: safe60s, params: [['HoM', 'SC']]}],
},{
    name: '2.4 Split Loop 120s (HoM+SC)',
    calls: [{fn: safe60s, params: [['HoM', 'SC']]}],
},{
    name: '2.5 10s Pause',
    calls: [{fn: sleep, params: [10000]}],
},{
    name: '3.1 Mid Transition [Max DS]',
    calls: [{fn: increaseSkills, params: [true, ['DS']]}],
},{
    name: '3.2 Late Transition [Max WC]',
    calls: [{fn: increaseSkills, params: [true, ['WC']]}],
},{
    name: '3.3 Prestige',
    calls: [{fn: prestige}],
},{
    name: '3.4 BoS Max Upgrade',
    calls: [{fn: bookOfShadows}],
},{
    name: '4.1 Mid Loop x3 with start pause',
    calls: [
        { fn: ensureNotWaitingForBoss },
        { fn: midLoop }, { fn: midLoop }, { fn: midLoop },
        { fn: increaseSkills, params: [false, ['DS']] },
    ],
},{
    name: '4.2 Late Loop x3 with start pause',
    calls: [
        { fn: ensureNotWaitingForBoss },
        { fn: lateLoop }, { fn: lateLoop }, { fn: lateLoop },
        { fn: increaseSkills, params: [false, ['DS', 'WC']] },
    ],
}];
macros.forEach(macro => {
    newAction(macro.name);
    macro.calls.forEach(({fn, params = []}) => fn(...params));
    writeIt(macro.name);
});

name = '5. Test'
newAction(name);
// twoPagesOfHeroes();
astralLocations.forEach(({ X, Y }) => {
    generateOneClick({ X, Y, duration: HIT_DURATION });
});
// writeIt(name);

function writeIt(name) {
    fs.writeFileSync(`${outputPath}/${name}.json`, JSON.stringify(action, null, 2));
}

// generateScript();
// console.log(JSON.stringify(action, null, 2));
