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

WindowShadeHelper.prototype.setShadePosition = function(shadeName, shadePosition) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + 'shades?',
    json: true
  };
  rp(options).then(function (body) {
    var shades = body.shadeData;
    var shadeNameDecoded = '';
    var shadeId = '';
	  var shadePositionValue = (65535 * shadePosition / 100).toFixed(0);
    shades.forEach(function(shade) {
      shadeNameDecoded = Buffer(shade.name, 'base64').toString('ascii');
      if(shadeName == shadeNameDecoded) {
        shadeId = shade.id;
      }
    });
    options = {
      method: 'PUT',
      uri: ENDPOINT + 'shades/' + shadeId,
      body: {shade: {id: shadeId, positions: {position1: shadePositionValue, posKind1: 1}}},
      json: true
    };
    rp(options);
  });
};

module.exports = WindowShadeHelper;
