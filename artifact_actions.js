const { WIN_DURATION, UI_DURATION } = require('./durations');
const { pageUp, ensureClosed } = require('./ui_controls');

exports.bookOfShadows = function (macro) {
    macro.addKey('5', WIN_DURATION);
    // Ensure MAX is selected
    macro.addClick({ X: 84.31, Y: 8.43, duration: WIN_DURATION });
    macro.addClick({ X: 9.84, Y: 8.51, duration: WIN_DURATION });
    // Scroll to top
    pageUp(macro, 3);
    for ( let i = 0; i < 7; i++) {
        macro.addClick({ X: 84.26, Y: 28.71 });
    }
    // Reset to lowest to avoid screwing self over
    macro.addClick({ X: 84.31, Y: 8.43, duration: WIN_DURATION });
    macro.addClick({ X: 60.04, Y: 8.51, duration: WIN_DURATION });
    ensureClosed(macro);
}
