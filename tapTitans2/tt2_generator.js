const altGen = require('./generators/alts');
const raidsGen = require('./generators/raids');
const abyssGen = require('./generators/abyss');
const clanShipGen = require('./generators/clan_ship');
const shadowCloneGen = require('./generators/shadow_clone');
const heavenlyStrikeGen = require('./generators/heavenly_strike');
const petGen = require('./generators/pet');

const config = require('../common/utilities/config');

config.set({
    // updateMode: true,
    // useFairies: true,
    tapEquipment: false,
    // filter: 'HS+F',
});

// abyssGen();
altGen();
petGen();
clanShipGen();
shadowCloneGen();
raidsGen();
heavenlyStrikeGen();
