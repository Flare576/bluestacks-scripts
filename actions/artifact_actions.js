const { heroUpgradeButtons, spendRelics, safeTap } = require('../data/locations');
const { WIN_DURATION, UI_DURATION } = require('../data/durations');
const { newArtifact, artifactButtons, shadowCloneProfile, abyssProfile } = require('../data/artifacts');
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
    // Scroll to top
    pageUp(macro, 3);
    macro.addClick(newArtifact, UI_DURATION);
    macro.addClick(spendRelics, UI_DURATION);
    macro.addClick(safeTap);
    macro.addClick(safeTap);
    ensureClosed(macro);
}

exports.upgradeAll = function (macro, artifacts = 90, taps = 3) {
    let profile = [];
    for (let i = 0; i < 60; i++) {
        profile.push(3);
    }
    exports.applyArtifactProfile(macro, profile);
}

exports.applyArtifactProfile = function (macro, profile) {
    const bump = (pt, ct) => {
        for (let i = 0; i < ct; i++) {
            macro.addClick(pt, UI_DURATION);
        }
    };
    macro.addKey('5', WIN_DURATION);
    setMinBuy(macro);
    let artifactIdx = 0;
    let pages = 0;
    while (artifactIdx < profile.length) {
        artifactButtons.forEach((point, idx) => {
            bump(point, profile[artifactIdx++]);
        });
        pages++;
        pageDown(macro, 1, 20);
    }
    pageUp(macro, pages+1);
    ensureClosed(macro);
}

exports.upgradeShadowClone = function (macro) {
    exports.applyArtifactProfile(macro, shadowCloneProfile);
}

exports.upgradeAbyss = function (macro) {
    exports.applyArtifactProfile(macro, abyssProfile);
}
