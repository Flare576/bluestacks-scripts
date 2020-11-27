const { HIT_DURATION, WIN_DURATION } = require('./durations.js');

exports.ensureBottomOfPets = function (macro) {
    macro.addKey('4', WIN_DURATION);
    exports.pageDown(macro, 2);
    exports.ensureClosed(macro);
}

exports.ensureClosed = function (macro) {
    // Tap Hero panel
    macro.addClick({X: 25.19, Y: 98.91, duration: HIT_DURATION});
    macro.addClick({X: 25.19, Y: 98.91, duration: HIT_DURATION});
    macro.addClick({X: 25.19, Y: 98.91});
    macro.addKey('4', WIN_DURATION);
    macro.addClick({X: 76.67, Y: 88.11, duration: HIT_DURATION});
    macro.addKey('4', WIN_DURATION);
    exports.clickContinue(macro);
}

exports.clickContinue = function (macro) {
    macro.addClick({ X: 71.11, Y: 73.11 });
    macro.addClick({ X: 71.11, Y: 73.11, duration: HIT_DURATION * 2});
}

exports.pagePartialUp = function (macro, depth = 1) {
    for (let i = 0; i < depth; i++) {
        macro.addDrag({X: 49.21, Y: 16.27}, {X: 49.21, Y: 50.88});
    }
}

exports.pageUp = function (macro, depth = 1) {
    for (let i = 0; i < depth; i++) {
        macro.addDrag({X: 49.21, Y: 16.27}, {X: 49.21, Y: 93.88});
    }
}

exports.pageDown = function (macro, depth = 1) {
    for (let i = 0; i < depth; i++) {
        macro.addDrag({X: 49.21, Y: 93.88}, {X: 49.21, Y: 21.27});
    }
}

exports.ensureEnlarged = function (macro) {
    // Take your time with this shit
    macro.addKey('1', WIN_DURATION); // random window
    macro.addKey('2', WIN_DURATION); // window we care about
    macro.addClick({X: 80.71, Y: 54.42 }); // Either the full screen button or nothing important
    macro.addKey('2', WIN_DURATION); // close
}

exports.ensureHeroMaxBuy = function (macro) {
    macro.addKey('2', WIN_DURATION);
    macro.addClick({ X: 84.31, Y: 8.43 });
    macro.addClick({ X: 9.84, Y: 8.51 });
    exports.ensureClosed(macro);
}
