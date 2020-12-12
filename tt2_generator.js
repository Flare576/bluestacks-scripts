const altGen = require('./generators/alts');
const raidsGen = require('./generators/raids');
const abyssGen = require('./generators/abyss');
const clanShipGen = require('./generators/clan_ship');
const shadowCloneGen = require('./generators/shadow_clone');

const config = require('./utilities/config');

config.set({ updateMode: true });

abyssGen();
altGen();
clanShipGen();
shadowCloneGen();
raidsGen();
