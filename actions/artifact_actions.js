const { heroUpgradeButtons, discoverArtifact, spendRelics, safeTap } = require('../data/locations');
const { WIN_DURATION, UI_DURATION } = require('../data/durations');
const {
    pageUp,
    pageDown,
    ensureClosed,
    setMaxBuy,
    setMinBuy,
} = require('../utilities/ui_controls');

exports.bookOfShadows = function (macro) {
    macro.addKey('5', WIN_DURATION);
    setMaxBuy(macro);
    // Scroll to top
    pageUp(macro, 3);
    for ( let i = 0; i < 10; i++) {
        macro.addClick({ X: 84.26, Y: 28.71 });
    }
    setMinBuy(macro);
    ensureClosed(macro);
}

exports.discoverArtifact = function (macro) {
    macro.addKey('5', WIN_DURATION);
    macro.addClick(discoverArtifact, UI_DURATION);
    macro.addClick(spendRelics, UI_DURATION);
    macro.addClick(safeTap);
    macro.addClick(safeTap);
    ensureClosed(macro);
}

exports.upgradeAll = function (macro, pages = 7, taps = 3) {
    const tappy = (coords) => { for (let i=0;i<taps;i++) macro.addClicks(coords, UI_DURATION / 2); }
    macro.addKey('5', WIN_DURATION);
    const locations = [...heroUpgradeButtons];
    locations.splice(0, 2);
    tappy(locations);
    for (let i = 0; i < pages; i++) {
        pageDown(macro, 1, 20);
        tappy(locations);
    }
    pageUp(macro, pages + 1);
    ensureClosed(macro);
}
