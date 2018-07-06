//const ZombieBuzzer = require('./ZombieBuzzer');
const ZombieLED = require('./ZombieLED');

// export the devices you want to make available to the Brain (see README for more information)
module.exports = {
  devices: [
 	ZombieBuzzer,
    ZombieLED
  ],
};