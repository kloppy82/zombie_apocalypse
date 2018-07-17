'use strict';

const BluePromise = require('bluebird');
//const CONSTANTS = require('./constants');
const debug = require('debug')('neeo:zombie');

var PythonShell = require('python-shell');
var pyshell = new PythonShell('../switch_matrix/switch_matrix_test_2.py');

var LEDStatus = "off";

/*
 * Device Controller
 * Events on that device from the Brain will be forwarded here for handling.
 */


// sends a message to the Python script via stdin
function updateStripe(){
  console.log("Call updateStripe");
  pyshell.send(`${LEDStatus}`);
  console.log(`Sent: ${LEDStatus}`);
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
  switch(name){
    case "POWER OFF":     LEDStatus = "off";
                          break;
						  
    case "POWER ON":      LEDStatus = "on";
                          break;
  }
  updateStripe();

};


