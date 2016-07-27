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
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

WindowShadeHelper.prototype.getAllSceneCollections = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenecollections?',
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

WindowShadeHelper.prototype.getScene = function(sceneName) {
  var scenes = this.getAllScenes().sceneData;
  var sceneNameDecoded = '';
  var sceneId = '';
  scenes.forEach(function(scene) {
    sceneNameDecoded = Buffer(scene.name, 'base64').toString('ascii');
    if(sceneName == sceneNameDecoded) {
      sceneId = scene.id;
    }
  });
  if(sceneId == '') {
    scenes = this.getAllSceneCollections().sceneCollectionData;
    scenes.forEach(function(scene) {
      sceneNameDecoded = Buffer(scene.name, 'base64').toString('ascii');
      if(sceneName == sceneNameDecoded) {
        sceneId = scene.id;
      }
    });
  }
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenes?sceneid=' + sceneId,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

WindowShadeHelper.prototype.getSceneCollection = function(sceneId) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenecollections?scenecollectionid=' + sceneId,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

module.exports = WindowShadeHelper;
