const { heroUpgradeButtons } = require('../data/locations');
const { WIN_DURATION, UI_DURATION, HIT_DURATION } = require('../../common/data/durations');
const { pagePartialUp, pageDown, pageUp, ensureClosed } = require('../actions/ui_controls');

exports.onePageOfHeroes = function (macro, reversed) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro);
    exports.tapNineButtons(macro, reversed);
    ensureClosed(macro);
}

exports.spamHeroes = function (macro, time, pages = 3) {
    const start = macro.next;
    const flip = [...heroUpgradeButtons].reverse();
    macro.addKey('2', WIN_DURATION);
    while (macro.next - start < time) {
        for (let i=0;i<pages;i++){
            heroUpgradeButtons.forEach(point => {
                macro.addClick(point, HIT_DURATION * 2);
            });
            pageDown(macro, 1, 2);
        }
        for (let i=0;i<pages;i++){
            flip.forEach(point => {
                macro.addClick(point, HIT_DURATION);
            });
            pageUp(macro, 1, 4);
        }
    }
    macro.addKey('2', WIN_DURATION);
}

// Normal is top-down, reversed is bottom-up
exports.pagesOfHeroes = function (macro, pages = 2, reversed = false) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro); // Help ensure we line up with the taps
    if (reversed) {
        pageDown(macro, pages, 2);
        for (let i=0;i<pages;i++) {
            exports.tapNineButtons(macro, reversed);
            pageUp(macro, 1, 2);
        }
        exports.tapNineButtons(macro, reversed);
    } else {
        exports.tapNineButtons(macro, reversed);
        for (let i=1;i<pages;i++) {
            pageDown(macro, 1, 2);
            exports.tapNineButtons(macro, reversed);
        }
        pageUp(macro, pages - 1, 2);
    }
    ensureClosed(macro);
}

exports.tapNineButtons = function (macro, reversed) {
    let points = [...heroUpgradeButtons];
    reversed && points.reverse();

    points.forEach(({X, Y}) => {
        macro.addClick({ X, Y }, 75);
    });
}
