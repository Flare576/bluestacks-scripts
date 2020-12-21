const { writeIt } = require('../utilities/file_tools');
const Macro = require('../utilities/macro');
const { titan } = require('../data/locations');

const titanParts = Object.keys(titan);
const titanDuration = 15;

module.exports = () => {
    [ ...(titanParts.map(part => ({name:part,parts:[part]}))),
    {
        name: 'Titan All Parts',
        parts: [...titanParts],
    },{
        name: 'Titan All Limbs',
        parts: ['Left Arm', 'Right Arm', 'Left Hand', 'Right Hand', 'Left Leg', 'Right Leg'],
    },{
        name: 'Titan - Terro',
        parts: ['Head', 'Body', 'Left Leg'],
    },{
        name: 'Titan - Sterl',
        parts: ['Head', 'Body', 'Left Leg', 'Left Hand'],
    },{
        name: 'Titan - Jukk',
        parts: ['Head', 'Body', 'Left Leg', 'Right Leg'],
    },{
        name: 'Titan - Lojak',
        parts: ['Left Arm', 'Head', 'Right Arm', 'Body', 'Right Hand', 'Left Leg', 'Right Leg'],
    },{
        name: 'Titan - Mohaca',
        parts: ['Left Arm', 'Head', 'Right Arm', 'Left Hand', 'Right Hand', 'Left Leg', 'Right Leg'],
    }].forEach(({name, parts}) => {
        const macro = new Macro(name);
        titanLoop(macro, parts);
        writeIt('raids', macro);
    });

    function titanLoop (macro, targets) {
        const tCount = targets.length;
        // always 30s, pad by 2s for countdown
        const titanTime = 32000;
        // Fusion bomb needs 2750 to explode... call it 3000
        const eachPart = tCount > 1 ? 3000 / (tCount - 1) : titanTime;
        const eachPartSwipe = eachPart / titanDuration; // 3000 / 15 = 200 swipes
        const loopDuration = eachPart * tCount; // time per part * # of parts
        const titanLoops = titanTime / loopDuration; // time available / time per loop

        const {X,Y} = titan[targets[0]];
        macro.addEvent({ X, Y, Delta: 0, EventType: 'MouseDown', titanDuration });
        // For as many loops as it takes to fill {titanTime}...
        for (let i = 0; i < titanLoops; i++) {
            // hit every target...
            targets.forEach((target) => {
                // as many times as it takes to fill {eachPart}
                for (let j = 0; j < eachPartSwipe; j++) {
                    // random number between -2 and 2 for new swipe location
                    const ox = (Math.random() * 2) - .5;
                    const oy = (Math.random() * 2) - .5;
                    const {X,Y} = titan[target];

                    macro.addEvent({ X: X+ox, Y:Y+oy, Delta: 0, EventType: 'MouseMove', duration: titanDuration });
                }
            });
        }
        macro.addEvent({ X, Y, Delta: 0, EventType: 'MouseUp', titanDuration });
    }
}
