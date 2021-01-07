const { writeIt } = require('../common/utilities/file_tools');
const Macro = require('../common/utilities/macro');
const config = require('../common/utilities/config');

config.set({updateMode: true});

const macroDuration = 600000;


const UI_centerLine = {X: 5.37, Y: 84.81};
const flower1 = UI_centerLine;
const flower2 = { X: 16.61, Y: 85.67 };
const flower3 = { X: 28.24, Y: 86.27 };
const flower4 = { X: 37.98, Y: 83.39 };

const dumDragonEventDur = 4500;
const dumDragonFlowerL5Dur = 35000;
const dumDragonFlowerL6Dur = 17000;
const dumDragonFlowerL7Dur = 10300;

const smartDragonEventDur = 12400;
const smartDragonFlowerL5Dur = 1800;
const smartDragonFlowerL6Dur = 6000;
const smartDragonFlowerL7Dur = 3700;

const builderDragonEventDur = 12900;
const builderDragonFlowerL5Dur = 2300;
const builderDragonFlowerL6Dur = 6500;
const builderDragonFlowerL7Dur = 4800;

const flowersL5 = [
    { target: flower1, duration: dumDragonFlowerL5Dur },
    { target: flower2, duration: smartDragonFlowerL5Dur }
];

const flowersL6 = [
    { target: flower1, duration: dumDragonFlowerL6Dur },
    { target: flower2, duration: smartDragonFlowerL6Dur }
];

const flowersL7 = [
    { target: flower1, duration: dumDragonFlowerL7Dur },
    { target: flower2, duration: smartDragonFlowerL7Dur }
];

const fourDragons = [
    { target: flower1, duration: builderDragonFlowerL7Dur },
    { target: flower2, duration: builderDragonFlowerL7Dur },
    { target: flower3, duration: builderDragonFlowerL7Dur },
    { target: flower4, duration: builderDragonFlowerL7Dur },
    // { target: flower1, duration: dumDragonFlowerL7Dur },
    // { target: flower2, duration: builderDragonFlowerL7Dur },
    // { target: flower3, duration: smartDragonFlowerL7Dur },
    // { target: flower4, duration: builderDragonFlowerL7Dur },
]

const events = [
    { target: flower1, duration: dumDragonEventDur },
    { target: flower2, duration: smartDragonEventDur }
];

function useObjects (macro, objects) {
    let allMoves = [];
    let moves = [];
    const start = 1000;
    objects.forEach(({ target, duration }) => {
        for(let timestamp = start; timestamp < macroDuration; timestamp += duration){
            moves.push({target, duration, timestamp});
        }
    });


    // contains all taps on all targets, but not in chronological order:
    // target1click1, target1click2.... target2click(n-1), target2click(n)
    // sort so that we have
    // target1click1, target2click1, target2click2, target1click2..... in chronological order
    moves
        .sort((a,b) => a.timestamp - b.timestamp)
        .forEach(({timestamp, target}, idx) => {
            // since duration is now meaningless (it represents the difference between target1click(x) and
            // target1click(x+1), not chronological), we need to know how long to wait from this tap to the next
            // If both taps want to happen simultaneously, wait some arbitrary time between them
            const length = moves[idx+1]?.timestamp - timestamp || 100;
            macro.addDoubleClick(target, length);
        });
}

const mergeStart = { X: 14.03, Y: 71.69 };
function merge (macro, position) {
    const mergeDistance = 3.11;
    const position2 = {...position};
    position2.X += mergeDistance;
    macro.startDrag(position);
    macro.continueDrag(position, position2);
    macro.continueDrag(position2, position);
    macro.endDrag(position);
}




[
    {
        name: 'MD - L5 Flowers',
        calls: [
            { fn: useObjects, params: [flowersL5] }
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: 'MD - L6 Flowers',
        calls: [
            { fn: useObjects, params: [flowersL6] }
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: 'MD - L7 Flowers',
        calls: [
            { fn: useObjects, params: [flowersL7] }
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: 'MD - Four Dragons',
        calls: [
            { fn: useObjects, params: [fourDragons] }
        ],
        mods: {LoopType: "UntilStopped"},
    },{
        name: 'MD - Merge',
        calls: [
            { fn: merge, params: [mergeStart] }
        ],
        // mods: {LoopType: "UntilStopped"},
    },{
        name: 'MD - Use Event',
        calls: [
            { fn: useObjects, params: [events] }
        ],
        mods: {LoopType: "UntilStopped"},
    }
].forEach(({name, calls, mods}) => {
    let macro = new Macro(name, mods);
    calls.forEach(({fn, params = []}) => fn(macro, ...params));
    writeIt('', macro);
});


// for (let i=0; i<20; i++) {
//     const dragon = nextDragon(macro, dragons);
//     makeWork(macro, dragon);
// }

// writeIt('', macro);

