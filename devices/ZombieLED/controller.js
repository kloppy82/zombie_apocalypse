'use strict';

const BluePromise = require('bluebird');
//const CONSTANTS = require('./constants');
const debug = require('debug')('neeo:zombie');

var PythonShell = require('python-shell');
var LED_RGBC = new PythonShell('../rpi_ws281x/python/examples/zombie_alert_RGBC.py');

var sliderValueR = 0;
var sliderValueG = 0;
var sliderValueB = 0;
var sliderValueBr = 0;
var mode = 0;
/*
 * Device Controller
 * Events on that device from the Brain will be forwarded here for handling.
 */


//var LED_RGBC = new PythonShell('test.py');

// sends a message to the Python script via stdin
function updateStripe(){
  console.log("Call updateStripe");
  //LED_RGBC.send('10 20 30 40');
  LED_RGBC.send(`${sliderValueR} ${sliderValueG} ${sliderValueB} ${sliderValueBr}`);
  console.log(`Sent: ${sliderValueR} ${sliderValueG} ${sliderValueB} ${sliderValueBr}`);
  console.log("Call updateStripe End");
}

function updateMode(){
  console.log("Call updateStripe");
  //LED_RGBC.send('10 20 30 40');
  LED_RGBC.send(`${mode}`);
  console.log(`Sent: ${sliderValueR} ${sliderValueG} ${sliderValueB} ${sliderValueBr}`);
  console.log("Call updateStripe End");
}

LED_RGBC.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log("LED_RGBC: "+ message);
});

// end the input stream and allow the process to exit

function endPython(){
  LED_RGBC.end(function (err,code,signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
  });
}

/**
 * One button handler for each registered button
 */
module.exports.onButtonPressed = function onButtonPressed(name, deviceId) {
  console.log(`[CONTROLLER] ${name} button pressed for device ${deviceId}`);
  // TODO implement the actions for your device here
  switch(name){
    case "FUNCTION RED":  sliderValueR = 255;
                          sliderValueG = 0;
                          sliderValueB = 0;
                          sliderValueBr = 255;
                          updateStripe();
                          break;
    case "FUNCTION GREEN":sliderValueR = 0;
                          sliderValueG = 255;
                          sliderValueB = 0;
                          sliderValueBr = 255;
                          updateStripe();
                          break;
    case "FUNCTION BLUE":  sliderValueR = 0;
                          sliderValueG = 0;
                          sliderValueB = 255;
                          sliderValueBr = 255;
                          updateStripe();
                          break;
    case "FUNCTION YELLOW":  sliderValueR = 255;
                          sliderValueG = 255;
                          sliderValueB = 0;
                          sliderValueBr = 255;
                          updateStripe();
                          break;
    case "POWER OFF":     sliderValueR = 0;
                          sliderValueG = 0;
                          sliderValueB = 0;
                          sliderValueBr = 0;
                          updateStripe();
                          break;
    case "POWER ON":      sliderValueR = 255;
                          sliderValueG = 255;
                          sliderValueB = 255;
                          sliderValueBr = 255;
                          updateStripe();
                          break;
    case "rainbow":       mode = 2; 
						  updateMode();
  }
  

};

module.exports.SliderSetRed = function SliderSetRed(deviceId,value) {
  console.log(`[CONTROLLER]  Slider Red value ${value}`);
  // TODO implement the actions for your device here
  sliderValueR = value;
  updateStripe();
};

module.exports.SliderSetGreen = function SliderSetGreen(deviceId,value) {
  console.log(`[CONTROLLER]  Slider Green value ${value}`);
  // TODO implement the actions for your device here
  sliderValueG = value;
  updateStripe();
};

module.exports.SliderSetBlue = function SliderSetBlue(deviceId,value) {
  console.log(`[CONTROLLER]  Slider Blue value ${value}`);
  // TODO implement the actions for your device here
  sliderValueB = value;
  updateStripe();
};

module.exports.SliderSetBrightness = function SliderSetBrightness(deviceId,value) {
  console.log(`[CONTROLLER]  Slider Brightness value ${value}`);
  // TODO implement the actions for your device here
  sliderValueBr = value;
  updateStripe();
};

module.exports.SliderGetRed = function SliderGetRed(deviceId) {
  console.log('[CONTROLLER] return current Red value', deviceid, sliderValueR);
  // you can return a promise if that make sense OR just return a value
  return BluePromise.resolve(sliderValueR);
};

module.exports.SliderGetGreen = function SliderGetGreen(deviceId) {
  console.log('[CONTROLLER] return current Green value', deviceid, sliderValueG);
  // you can return a promise if that make sense OR just return a value
  return BluePromise.resolve(sliderValueG);
};

module.exports.SliderGetBlue = function SliderGetBlue(deviceId) {
  console.log('[CONTROLLER] return current Blue value', deviceid, sliderValueB);
  // you can return a promise if that make sense OR just return a value
  return BluePromise.resolve(sliderValueB);
};

module.exports.SliderGetBrightness = function SliderGetBrightness(deviceId) {
  console.log('[CONTROLLER] return current  Brightness value', deviceid, sliderValueBr);
  // you can return a promise if that make sense OR just return a value
  return BluePromise.resolve(sliderValueBr);
};


