const { WIN_DURATION, UI_DURATION } = require('../data/durations');
const {
    pageUp,
    ensureClosed,
    setMaxBuy,
    setMinBuy,
} = require('../utilities/ui_controls');

exports.bookOfShadows = function (macro) {
    macro.addKey('5', WIN_DURATION);
    setMaxBuy(macro);
    // Scroll to top
    pageUp(macro, 3);
    for ( let i = 0; i < 7; i++) {
        macro.addClick({ X: 84.26, Y: 28.71 });
    }
    setMinBuy(macro);
    ensureClosed(macro);
}
