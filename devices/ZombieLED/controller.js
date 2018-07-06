'use strict';

const BluePromise = require('bluebird');
//const CONSTANTS = require('./constants');
const debug = require('debug')('neeo:zombie');

var PythonShell = require('python-shell');
var pyshell = new PythonShell('../rpi_ws281x/python/examples/zombie_alert_RGBC.py');

var sliderValueR = 0;
var sliderValueG = 0;
var sliderValueB = 0;
var sliderValueBr = 0;
/*
 * Device Controller
 * Events on that device from the Brain will be forwarded here for handling.
 */


//var pyshell = new PythonShell('test.py');

// sends a message to the Python script via stdin
function updateStripe(){
  console.log("Call updateStripe");
  //pyshell.send('10 20 30 40');
  pyshell.send(`${sliderValueR} ${sliderValueG} ${sliderValueB} ${sliderValueBr}`);
  console.log(`Sent: ${sliderValueR} ${sliderValueG} ${sliderValueB} ${sliderValueBr}`);
  console.log("Call updateStripe End");
}


pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log("PyShell: "+ message);
});

// end the input stream and allow the process to exit

function endPython(){
  pyshell.end(function (err,code,signal) {
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
  /*switch(name){
    case "test": pyshell.send(10,20,30,40);
  }*/
  pyshell.send("10 20 30 40");
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


