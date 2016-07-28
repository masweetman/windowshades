'use strict';
var config = require('./config');
var rp = require('request-promise');
var ENDPOINT = 'http://' + config.powerViewIP + '/api/';

function WindowShadeHelper () {
};

WindowShadeHelper.prototype.getAllScenes = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenes?',
    resolveWithFullResponse: false,
    json: true
  };
  return rp(options)
};

WindowShadeHelper.prototype.getScene = function(sceneName) {
  var scenes = []
  var sceneNameDecoded = '';
  var query = '';
  scenes.forEach(function(scene) {
    sceneNameDecoded = Buffer(scene.name, 'base64').toString('ascii');
    if(sceneName == sceneNameDecoded) {
      query = 'scenes?sceneid=' + scene.id;
    }
  });
  var options = {
    method: 'GET',
    uri: ENDPOINT + query,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

module.exports = WindowShadeHelper;
