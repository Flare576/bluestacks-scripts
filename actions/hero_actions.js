const { heroUpgradeButtons } = require('../data/locations');
const { WIN_DURATION, UI_DURATION } = require('../data/durations');
const { pagePartialUp, pageDown, pageUp, ensureClosed } = require('../utilities/ui_controls');

exports.onePageOfHeroes = function (macro, reversed) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro);
    exports.tapNineButtons(macro, reversed);
    ensureClosed(macro);
}

// Normal is top-down, reversed is bottom-up
exports.pagesOfHeroes = function (macro, pages = 2, reversed = false) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro); // Help ensure we line up with the taps
    if (reversed) {
        pageDown(macro, pages);
        for (let i=0;i<pages;i++) {
            exports.tapNineButtons(macro, reversed);
            pageUp(macro);
        }
        exports.tapNineButtons(macro, reversed);
    } else {
        exports.tapNineButtons(macro, reversed);
        for (let i=1;i<pages;i++) {
            pageDown(macro);
            exports.tapNineButtons(macro, reversed);
        }
        pageUp(macro, pages - 1);
    }
    ensureClosed(macro);
}

exports.tapNineButtons = function (macro, reversed) {
    let points = [...heroUpgradeButtons];
    reversed && points.reverse();

    points.forEach(({X, Y}) => {
        macro.addClick({ X, Y }, UI_DURATION / 2);
    });
}
