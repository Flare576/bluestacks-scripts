/*
Rules: X/Y coords MUST have at least 1 decimal place
MouseDown and first MouseMove must NOT have same values on a drag
*/
/* Buy Complete Set button bounding box
85.89, 26.01   97.86, 24.51
  _________________
  |               |
  |               |
  |_______________|
86.01, 31.21   98,75, 31.33
*/
/* Equipment drop bounding box:
63.91, 43.98   87.02, 44.3
  _________________
  |               |
  |               |
  |_______________|
66.4, 53.69    87.02,54.57
*/
exports.allSkills = {
    activate: {
        HS: 8.09,
        DS: 25.01,
        HoM: 41.47,
        FS: 58.09,
        WC: 75.01,
        SC: 91.32,
        Y: 89.55,
    },
    levelUp: {
        HS: 39.33,
        DS: 48.33,
        HoM: 57.33,
        FS: 66.33,
        WC: 75.33,
        SC: 84.35,
        oneX: 93.55,
        maxX: 58.93,
    },
};
exports.astralLocations = [
    { X: 3.69, Y: 23.19 },
    { X: 12.41, Y: 22.91 },
    { X: 24.29, Y: 20.08 },
    { X: 22.11, Y: 24.88 },
    { X: 16.08, Y: 28.09 },
    { X: 10.55, Y: 28.18 },
    { X: 2.18, Y: 27.62 },
    { X: 1.17, Y: 33.93 },
    { X: 7.71, Y: 38.36 },
    { X: 11.73, Y: 35.06 },
    { X: 15.91, Y: 37.42 },
    { X: 20.11, Y: 39.4 },
    { X: 26.63, Y: 48.92 },
    { X: 20.61, Y: 47.5 },
    { X: 14.74, Y: 48.73 },
    { X: 10.72, Y: 46.47 },
    { X: 4.36, Y: 47.13 },
    { X: 86.77, Y: 12.44 },
    { X: 79.73, Y: 17.34 },
    { X: 95.14, Y: 15.93 },
    { X: 96.31, Y: 18.28 },
    { X: 93.31, Y: 21.02 },
    { X: 86.93, Y: 21.21 },
    { X: 78.39, Y: 23.19 },
    { X: 78.22, Y: 23.19 },
    { X: 98.65, Y: 26.71 },
    // { X: 91.46, Y: 26.58 }, // Under button 1
    // { X: 86.93, Y: 28.09 }, // Under button 1
    { X: 82.58, Y: 27.24 },
    { X: 96.98, Y: 35.91 },
    { X: 87.94, Y: 38.08 },
    { X: 84.25, Y: 36.48 },
    { X: 96.15, Y: 46.65 },
    // { X: 89.78, Y: 48.44 }, // Too close to loot
    // { X: 82.91, Y: 49.29 }, // Too close to loot
    // { X: 77.55, Y: 46.65 }, // Too close to loot
    // { X: 71.36, Y: 49.48 }, // Too close to loot
];

exports.heroUpgradeButtons = [
    {X: 93.38, Y: 15.65},
    {X: 93.38, Y: 20.15},
    {X: 73.38, Y: 24.65},
    {X: 73.38, Y: 29.15},
    {X: 73.38, Y: 33.65},
    {X: 93.38, Y: 38.15},
    {X: 93.38, Y: 42.65},
    {X: 93.38, Y: 47.15},
    {X: 93.38, Y: 51.65},
    {X: 93.38, Y: 56.15},
    {X: 93.38, Y: 60.65},
    {X: 93.38, Y: 65.15},
    {X: 93.38, Y: 69.65},
    {X: 93.38, Y: 74.15},
    {X: 93.38, Y: 78.65},
    {X: 93.38, Y: 83.15},
    {X: 93.38, Y: 87.65},
    {X: 93.38, Y: 91.96},
];

exports.daggers = [
    { X: 34.66, Y: 40.13 },
    { X: 42.08, Y: 40.13 },
    { X: 49.64, Y: 40.77 },
    { X: 57.35, Y: 39.89 },
    { X: 64.48, Y: 39.09 },
];

exports.crewLocation = { X: 36.59, Y: 49.63 };
exports.petLocation = { X: 52.92, Y: 48.64 };

exports.fullScreenButton = { X: 80.71, Y: 54.42 };
exports.safeTap = { X: 29.12, Y: 0.33 };
exports.buyBox = { X: 84.31, Y: 8.43 };
exports.maxPurchase = { X: 9.84, Y: 8.51 };
exports.hundredPurchase = { X: 26.91, Y: 8.66 };
exports.minPurchase = { X: 60.04, Y: 8.51 };
exports.drops = { X: 66.67, Y: 51.68 };
exports.masterLevel = { X: 84.11, Y: 16.06 };
exports.prestigeButton = { X: 83.24, Y: 28.89 };
exports.prestigePopupEvent = { X: 50.01, Y: 89.06 };
exports.prestigePopup = { X: 49.59, Y: 84.99 };
exports.prestigeConfirmEvent = { X: 68.57, Y: 74.84 };
exports.prestigeConfirm = { X: 68.11, Y: 71.29 };
exports.prestigeConfirm2 = { X: 68.47, Y: 67.46 };
exports.discoverArtifact = {X: 80.32, Y: 19.66 };
exports.spendRelics = {X: 47.99, Y: 68.47 };
exports.noThanks = { X: 27.34, Y: 73.68 };
exports.collect = { X: 71.11, Y: 73.11 };
exports.fightBoss = { X: 88.01, Y: 2.82 };

// Raids
exports.titan = {
    'Left Arm': {X: 13.31, Y: 37.79},
    'Head': {X: 50.75, Y: 34.51},
    'Right Arm': {X: 82.09, Y: 38.17},
    'Left Hand': {X: 13.16, Y: 58.93},
    'Body': {X: 48.17, Y: 47.79},
    'Right Hand': {X: 86.43, Y: 57.18},
    'Left Leg': {X: 31.48, Y: 75.88},
    'Right Leg': {X: 64.59, Y: 75.57},
};
