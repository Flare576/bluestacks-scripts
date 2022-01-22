const { writeIt } = require('../common/utilities/file_tools');
const Macro = require('../common/utilities/macro');
const config = require('../common/utilities/config');
const locations = require('./locations');

config.set({updateMode: true});

const macroDuration = 600000;

function clickFist = (macro) => {
    macro.addClick(locations.darkFistButton);




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

