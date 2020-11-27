const { heroUpgradeButtons } = require('./locations');
const { WIN_DURATION, UI_DURATION } = require('./durations');
const { pagePartialUp, pageDown, pageUp, ensureClosed } = require('./ui_controls');

exports.onePageOfHeroes = function (macro, reversed) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro);
    exports.tapNineButtons(macro, reversed);
    ensureClosed(macro);
}

exports.twoPagesOfHeroes = function (macro, reversed) {
    macro.addKey('2', WIN_DURATION);
    pagePartialUp(macro); // Help ensure we line up with the taps
    pageDown(macro);
    exports.tapNineButtons(macro);
    pageUp(macro);
    exports.tapNineButtons(macro);
    ensureClosed(macro);
}

exports.tapNineButtons = function (macro, reversed) {
    let points = [...heroUpgradeButtons];
    reversed && points.reverse();

    points.forEach(({X, Y}) => {
        macro.addClick({ X, Y, duration: UI_DURATION / 2 });
    });
}
