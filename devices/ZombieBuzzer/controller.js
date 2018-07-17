'use strict';

const BluePromise = require('bluebird');
//const CONSTANTS = require('./constants');
const debug = require('debug')('neeo:zombie');

var Gpio = require('onoff').Gpio; 
var pushButton = new Gpio(8, 'in', 'both',{debounceTimeout: 10});

/*
 * Device Controller
 * Events on that device from the Brain will be forwarded here for handling.
 */

const UPDATE_FREQUENCY_MS = 500;
const COMPLEX_DEVICE_UPDATE_ENTRY = 'unique-device-id-001';

let textlabelValue = 'initial value';
let sliderValue = 0;
let switchValue = false;
let sendComponentUpdate;
let counter=0;

/**
 * One button handler for each registered button
 */
module.exports.button = function(name, deviceid) {
  console.log(`[CONTROLLER] ${name} button pressed on ${deviceid}!`);
};

/**
 * Getters and setters:
 * - The getters are used to send the current Values through the SDK (read)
 * - The setter allow changing values on the Brain and handling the changes here (write)
 */

module.exports.switchSet = function(deviceid, value) {
  console.log('[CONTROLLER] switch set to', deviceid, value);
  switchValue = value;
};

module.exports.switchGet = function(deviceid) {
  console.log('[CONTROLLER] return switch value', deviceid, switchValue);
  return BluePromise.resolve(switchValue);
};


/**
 * Sending updates to Brain:
 * If the device value can change, the updated values should be sent to the Brain.
 *
 * - Upon registration the SDK will provide an updat callback to the adapter.
 * - That function can be called with sensor updates
 */
module.exports.registerStateUpdateCallback = function(updateFunction) {
  console.log('[CONTROLLER] register update state for complicatedDevice');
  sendComponentUpdate = updateFunction;
};



pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }

  if (counter)counter=false;
  else counter=true;
  debug('Value: '+value);
  const updateButtonPayload = {
   //uniqueDeviceId: COMPLEX_DEVICE_UPDATE_ENTRY,
    uniqueDeviceId: 'default',
    component: 'BUZZER_SENSOR', 
    value: counter
  };
    sendComponentUpdate(updateButtonPayload)
   .catch((error) => {
     debug('failed to send text notification', error.message);
   });
	console.log('Buzzer Interrupt');
});

/**
 * Send random updates to the NEEO Brain. This is just for illustration purpose,
 * idealy those events would be sent of a device
*/
/*
setInterval(() => {
  //debug('Interval');

  if (!sendComponentUpdate) {
   debug('update function not yet registered');
   return;
  }

  if (counter)counter=false;
  else counter=true;
  
  const updateButtonPayload = {
   //uniqueDeviceId: COMPLEX_DEVICE_UPDATE_ENTRY,
    uniqueDeviceId: 'default',
    component: 'BUZZER_SENSOR', 
    value: counter
  };
  debug(updateButtonPayload);
  sendComponentUpdate(updateButtonPayload)
   .catch((error) => {
     debug('failed to send text notification', error.message);
   });

}, UPDATE_FREQUENCY_MS);
*/
function unexportOnClose() { //function to run when exiting program
  //LED.writeSync(0); // Turn LED off
  //LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c 