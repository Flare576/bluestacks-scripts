/*

Rules: X/Y coords MUST have 2 decimal places
MouseDown and first MouseMove must NOT have same values on a drag
*/
const UI_DURATION = 250;
const HIT_DURATION = 20;

const TimeCreated = new Date().toISOString().replace(/[^\dT]/g, "").substring(0,15);
let next = 1000;
const action = {
    TimeCreated,
    Name: "Start Attack",
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

function generateClickFairies() {
    // Fairies fly along Y: 22/23 from X:12 to X:98
    // Every fairy could possibly trigger a "Continue"/"View Ad" window
    // Assume user has paid version, click "continue" button between each fairy click attempt
    // Should take ~2 secs to go full distance
    // click every 1 X values, total of 86 clicks, or 43/s
    const continueClickBase = { X: 71.1, Y: 73.1 };
    let Y = 22.5;
    for (let X = 13.1; X < 98; X += 1) {
        generateOneClick({X, Y, duration: HIT_DURATION});
        generateOneClick({...continueClickBase, duration: HIT_DURATION});
    }
    generateOneClick(continueClickBase);
}

function ensureClosed() {
    // tapping 1, then 2 twice will ensure the bottom panel is closed
    generateOneKey('1');
    generateOneKey('2');
    generateOneKey('2');
}

function activateCheapSkills() {
    // E is for Midas Touch, Y is for Shadow Clone
    generateOneKey('E');
    generateOneKey('Y');
}
function activateAllSkills() {
    generateOneKey('W');
    generateOneKey('E');
    generateOneKey('T');
    generateOneKey('Y');
}

function pageUp(depth = 1) {
    for (let i = 0; i < depth; i++) {
        generateDrag({X: 49.21, Y: 16.27}, {X: 49.21, Y: 93.88});
    }
}

function pageDown(depth = 1) {
    for (let i = 0; i < depth; i++) {
        generateDrag({X: 49.21, Y: 93.88}, {X: 49.21, Y: 16.27});
    }
}

function enlargeWindow() {
    // generateOneClick({X: 80.71, Y: 54.42 });
}

function shrinkWindow() {
    // generateOneClick({X: 81.96, Y: 1.71 });
}

function tapNineButtons(reversed) {
    const X = 83.38;
    let start = 87.65;
    let inc = 9;
    if (reversed) {
        start = 15.65;
        inc = -9;
    }
    for ( let i = 0; i < 9; i++) {
        const Y = +(start - (inc * i)).toFixed(2);
        generateOneClick({ X, Y });
    }
}

function onePageOfHeroes(reversed) {
    generateOneKey('2');
    pageUp();
    tapNineButtons(reversed);
    generateOneKey('2', 2 * UI_DURATION);
}

function twoPagesOfHeroes(reversed) {
    generateOneKey('2');
    enlargeWindow();
    pageUp(); // Help ensure we line up with the taps
    pageDown();
    tapNineButtons();
    pageUp();
    tapNineButtons();
    generateOneKey('2', 2 * UI_DURATION);
}

function tapFor(time) {
    const startWait = next;
    while ( next - startWait < time ) {
        // Crew
        generateOneClick({ X: 36.59, Y: 49.63, duration: HIT_DURATION });
        // Pet
        generateOneClick({ X: 58.84, Y: 48.44, duration: HIT_DURATION });
        // Daggers
        generateOneClick({ X: 35.06, Y: 42.31, duration: 1000 });
        generateOneClick({ X: 42.41, Y: 44.81, duration: 1000 });
        generateOneClick({ X: 50.27, Y: 45.12, duration: 1000 });
        generateOneClick({ X: 56.89, Y: 43.81, duration: 1000 });
        generateOneClick({ X: 64.41, Y: 41.99, duration: 1000 });
        // Re-activate the cheap skills if they're down
        activateCheapSkills();
    }
}

// mode init will add 1 lvl to main skills, max will use "all" button
function increaseSkills (mode = '') {
    generateOneKey('1');
    enlargeWindow();
    pageUp();
    // Level up Sword Dude
    generateOneClick({ X: 84.11, Y: 16.06 });

    generateOneClick({ X: 83.21, Y: 48.69 });
    if(mode === 'max') generateOneClick({ X: 58.93, Y: 48.69 });

    if(mode === 'init') generateOneClick({ X: 83.21, Y: 57.69 });

    generateOneClick({ X: 83.21, Y: 75.69 });
    if(mode === 'max') generateOneClick({ X: 58.93, Y: 75.69 });

    if(mode === 'init') generateOneClick({ X: 83.21, Y: 84.69 });

    generateOneKey('1');
}

function earlyLoop () {
    activateCheapSkills();
    generateClickFairies();
    activateAllSkills();
    onePageOfHeroes();
    tapFor(124000);
    sleep(2000); // Padding
}

function lateLoop () {
    activateCheapSkills();
    generateClickFairies();
    activateAllSkills();
    onePageOfHeroes(true);
    tapFor(60000);
    onePageOfHeroes(true);
    tapFor(45000);
}

function prestige () {
    generateOneKey('1');
    generateOneClick({ X: 84.97, Y: 29.31, duration: 2 * UI_DURATION });
    generateOneClick({ X: 49.91, Y: 87.21, duration: 2 * UI_DURATION  });
    generateOneClick({ X: 69.41, Y: 71.51, duration: 2 * UI_DURATION  });
    sleep(10000);
    // Do something useless, just to mark the sleep time
    generateOneKey('N');
}

function bookOfShadows () {
    generateOneKey('5');
    for ( let i = 0; i < 5; i++) {
        generateOneClick({ X: 84.26, Y: 28.71 });
    }
    generateOneKey('5');
}

function generateScript () {
    ensureClosed();

    // increaseSkills('init');
    // The first loop is likely going to have a few straglers
    // Tap 'em
    earlyLoop();
    twoPagesOfHeroes();

    // Loop 9 more times
    for (let i = 0; i < 7; i++) earlyLoop();
    increaseSkills('max');

    // There will be 1 more lateLoop cycle after this set of for's
    const loopsPerCycle = 4;
    const cycles = 2;
    for (let i = 1; i < cycles; i++) {
        for (let j = 0; j < loopsPerCycle; j++) lateLoop();
        increaseSkills(); // My current boss timer, wait one out to ensure we failed
        sleep(90000);
        generateOneKey('B');
    }
    for (let j = 0; j < loopsPerCycle; j++) lateLoop();
    prestige();
    bookOfShadows();
}

generateScript();
console.log(process);
//console.log(JSON.stringify(action, null, 2));
