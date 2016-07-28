'use strict';
var config = require('./config');
var rp = require('request-promise');
var ENDPOINT = 'http://' + config.powerViewIP + '/api/';

function WindowShadeHelper() {
};

WindowShadeHelper.prototype.getScene = function(sceneName) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'scenes?',
    json: true
  };
  rp(options).then(function (body) {
      var scenes = body.sceneData;
      var sceneNameDecoded = '';
      var query = '';
      scenes.forEach(function(scene) {
        sceneNameDecoded = Buffer(scene.name, 'base64').toString('ascii');
        if(sceneName == sceneNameDecoded) {
          query = 'scenes?sceneid=' + scene.id;
        }
      });
      options = {
        method: 'GET',
        uri: ENDPOINT + query,
        json: true
      };
      rp(options);
   });
};

module.exports = WindowShadeHelper;
