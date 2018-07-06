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

const ZombieLED = neeoapi.buildDevice('Zombie LED Stripe')
  .setManufacturer('NEEO')
  .setSpecificName('Zombie LED Stripe')
  .addAdditionalSearchToken('zombie')
  .addAdditionalSearchToken('led')
  .setType('LIGHT')
  .addButton({ name: 'test', label: 'Test Stripe'})
  .addButton({ name: 'knightrider', label: 'Knight Rider'})
  .addButton({ name: 'rainbow', label: 'Rainbow'})
  .addButtonGroup('Power')
  .addButtonGroup('Color Buttons')
  .addButtonHandler(controller.onButtonPressed)
  .addSlider({ name: 'red', label: 'Red', range: [0,255], unit: '%' }, {setter: controller.SliderSetRed,getter: controller.SliderGetRed})
  .addSlider({ name: 'green', label: 'Green', range: [0,255], unit: '%' }, {setter: controller.SliderSetGreen,getter: controller.SliderGetGreen})
  .addSlider({ name: 'blue', label: 'Blue', range: [0,255], unit: '%' }, {setter: controller.SliderSetBlue,getter: controller.SliderGetBlue})
  .addSlider({ name: 'brightness', label: 'Brightness', range: [0,255], unit: '%' }, {setter: controller.SliderSetBrightness,getter: controller.SliderGetBrightness});

module.exports = ZombieLED;
