const { heroUpgradeButtons, spendRelics, safeTap } = require('../data/locations');
const { WIN_DURATION, UI_DURATION } = require('../../common/data/durations');
const {
    newArtifact,
    artifactButtons,
    shadowCloneProfile,
    heavenelyStrikeProfile,
    abyssProfile
} = require('../data/artifacts');
const {
    pageUp,
    pageDown,
    ensureClosed,
    setMaxBuy,
    setMinBuy,
    setTierTwoBuy,
    setTierThreeBuy,
} = require('../actions/ui_controls');

exports.bookOfShadows = function (macro) {
    macro.addKey('5', WIN_DURATION);
    setMaxBuy(macro);
    // Scroll to top
    // pageUp(macro, 3);
    for ( let i = 0; i < 10; i++) {
        macro.addClick({ X: 84.26, Y: 28.71 });
    }
    setMinBuy(macro);
    ensureClosed(macro);
}

exports.discoverArtifact = function (macro, count = 1) {
    macro.addKey('5', WIN_DURATION);
    // Assume top
    // pageUp(macro, 3);
    for(let i=0;i<count;i++) {
        macro.addClick(newArtifact, UI_DURATION);
        macro.addClick(spendRelics, UI_DURATION);
        macro.addClick(safeTap);
        macro.addClick(safeTap);
    }
    ensureClosed(macro);
}

exports.upgradeAll = function (macro) {
    let profile = [];
    for (let i = 0; i < 24; i++) {
        profile.push(3);
    }
    exports.applyArtifactProfile(macro, profile);
}

exports.applyArtifactProfile = function (macro, profile) {
    let previous;
    const bump = (pt, artifact) => {
        const { clicks, percent } = artifact || {};
        if (!clicks) return;
        if ( percent !== previous ) {
            switch (percent) {
                case 1: setMinBuy(macro); break;
                case 5: setTierTwoBuy(macro); break;
                case 25: setTierThreeBuy(macro); break;
            }
            previous = percent;
        }

        for (let i = 0; i < clicks; i++) {
            macro.addClick(pt, UI_DURATION);
        }
    };
    macro.addKey('5', WIN_DURATION);
    let artifactIdx = 0;
    let pages = 0;
    const artifacts = profile.filter(a=>a.enabled);
    while (artifactIdx < artifacts.length) {
        artifactButtons.forEach((point, idx) => {
            let artifact;
            bump(point, artifacts[artifactIdx++]);
        });
        pages++;
        pageDown(macro, 1, 20);
    }
    pageUp(macro, pages+1);
    ensureClosed(macro);
}

exports.upgradeHeavenlyStrike = function (macro) {
    exports.applyArtifactProfile(macro, heavenelyStrikeProfile);
}

exports.upgradeShadowClone = function (macro) {
    exports.applyArtifactProfile(macro, shadowCloneProfile);
}

exports.upgradeAbyss = function (macro) {
    exports.applyArtifactProfile(macro, abyssProfile);
}
