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

const SwitchMatrix = neeoapi.buildDevice('Zombie Switch Matrix')
  .setManufacturer('NEEO')
  .setSpecificName('Zombie Switches')
  .addAdditionalSearchToken('zombie')
  .addAdditionalSearchToken('switch')
  .addAdditionalSearchToken('Matrix')
  .setType('LIGHT')
  .addButtonGroup('Power')
  .addButtonHandler(controller.onButtonPressed);

module.exports = SwitchMatrix;
