'use strict';
var config = require('./config');
var rp = require('request-promise');
var ENDPOINT = 'http://' + config.powerViewIP + '/api/';

function WindowShadeHelper () {
};

var getAllScenes = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenes?',
    resolveWithFullResponse: false,
    json: true
  };
  var data = rp(options)
  return data.response.body.sceneData;
};

var getAllSceneCollections = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenecollections?',
    resolveWithFullResponse: true,
    json: true
  };
  var data = rp(options)
  return data.response.body.sceneCollectionData;
};

WindowShadeHelper.prototype.getScene = function(sceneName) {
  var scenes = getAllScenes();
  var sceneNameDecoded = '';
  var query = '';
  scenes.forEach(function(scene) {
    sceneNameDecoded = Buffer(scene.name, 'base64').toString('ascii');
    if(sceneName == sceneNameDecoded) {
      query = 'scenes?sceneid=' + scene.id;
    }
  });
  if(sceneId == '') {
    scenes = getAllSceneCollections().sceneCollectionData;
    scenes.forEach(function(scene) {
      sceneNameDecoded = Buffer(scene.name, 'base64').toString('ascii');
      if(sceneName == sceneNameDecoded) {
        query = 'scenecollections?scenecollectionid=' + scene.id;
      }
    });
  }
  var options = {
    method: 'GET',
    uri: ENDPOINT + query,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

module.exports = WindowShadeHelper;
