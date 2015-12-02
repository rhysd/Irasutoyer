#! /usr/bin/env node

'use strict';

var spawn = require('child_process').spawn;
var electron = require('electron-prebuilt');
var path = require('path');

var detached = process.argv.indexOf("--detach") != -1;
var args = [path.join(__dirname, '..')];

if (detached) {
    spawn(electron, args, {
        stdio: 'ignore',
        detached: true
    }).unref();
} else {
    spawn(electron, args, {
        stdio: 'inherit'
    });
}
