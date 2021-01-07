const {
    buyBox,
    maxPurchase,
    tierTwoPurchase,
    tierThreePurchase,
    minPurchase,
    collect,
    updateNoteOK,
    noThanks,
    fightBoss,
}
=
require('../data/locations');
const { HIT_DURATION, WIN_DURATION } = require('../../comm../../common/data/durations');
const config = require('../../common/utilities/config');

exports.setMinBuy = function (macro) {
    macro.addClick(buyBox, WIN_DURATION);
    macro.addClick(minPurchase, WIN_DURATION);
}

exports.setTierTwoBuy = function (macro) {
    macro.addClick(buyBox, WIN_DURATION);
    macro.addClick(tierTwoPurchase, WIN_DURATION);
}

exports.setTierThreeBuy = function (macro) {
    macro.addClick(buyBox, WIN_DURATION);
    macro.addClick(tierThreePurchase, WIN_DURATION);
}

exports.setMaxBuy = function (macro) {
    macro.addClick(buyBox, WIN_DURATION);
    macro.addClick(maxPurchase, WIN_DURATION);
}

exports.ensureBottomOfPets = function (macro) {
    macro.addKey('4', WIN_DURATION);
    exports.pageDown(macro, 2);
    exports.ensureClosed(macro);
}

exports.fairyPopup = function (macro) {
    const { useFairies } = config.get();
    const point = useFairies ? collect : noThanks;
    macro.addClick(point);
    macro.addClick(point, HIT_DURATION * 2);
}

exports.ensureClosed = function (macro) {
    // Tap Hero panel
    // macro.addClick({X: 25.19, Y: 98.91}, HIT_DURATION);
    // macro.addClick({X: 25.19, Y: 98.91}, HIT_DURATION);
    // macro.addClick({X: 25.19, Y: 98.91});
    macro.addKey('4', WIN_DURATION);
    // macro.addClick({X: 36.67, Y: 88.11}, HIT_DURATION);
    macro.addClick({X: 76.67, Y: 88.11}, HIT_DURATION);
    macro.addClick({X: 76.67, Y: 88.11}, HIT_DURATION);
    macro.addKey('4', WIN_DURATION);
    exports.fairyPopup(macro);
}

exports.clickUpdateNoteOK = function (macro) {
    macro.addClick(updateNoteOK);
}

exports.pagePartialUp = function (macro, depth = 1) {
    for (let i = 0; i < depth; i++) {
        macro.addDrag({X: 49.21, Y: 16.27}, {X: 49.21, Y: 50.88});
    }
}

exports.pageUp = function (macro, depth = 1, duration = 6) {
    for (let i = 0; i < depth; i++) {
        macro.addDrag({X: 49.21, Y: 23.08}, {X: 49.21, Y: 93.83}, duration);
    }
}

exports.pageDown = function (macro, depth = 1, duration = 6) {
    for (let i = 0; i < depth; i++) {
        macro.addDrag({X: 49.21, Y: 94.01}, {X: 49.21, Y: 21.51}, duration);
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

exports.joinLeaveBoss = function (macro) {
    macro.addClick(fightBoss);
}
