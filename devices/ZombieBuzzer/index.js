'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');
//const CONSTANTS = require('./constants');

/*
 * Adapter - an Adapter contains one or more DEVICES. The idea of supporting
 * multiple devices in one adapter is, that you can support multiple similar
 * devices (think a full version or a lite version).
 * This allows not only supporting multiple of the same device, but also similar
 * devices.
 */

/*const discoveryInstructions = {
  headerText: 'HELLO HEADER',
  description: 'Zombie Buzzer YEAH!!!!'
};*/

const ZombieBuzzer = neeoapi.buildDevice('Zombie Buzzer')
  .setManufacturer('NEEO')
  .setSpecificName('Zombie Buzzer')
  .addAdditionalSearchToken('zombie')
  .addAdditionalSearchToken('buzzer')
  .setType('ACCESSORY')
  .addSwitch({ name: 'buzzer', label: 'Zombie Buzzer'},
    { setter: controller.switchSet, getter: controller.switchGet })
  .registerSubscriptionFunction(controller.registerStateUpdateCallback);

module.exports = ZombieBuzzer;
