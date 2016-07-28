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
      var query = '';
	  var shadePositionValue = MATH.round(65535 * shadePosition / 100);
      shades.forEach(function(shade) {
        shadeNameDecoded = Buffer(shade.name, 'base64').toString('ascii');
        if(shadeName == shadeNameDecoded) {
          query = 'shades/' + shade.id;
        }
      });
      options = {
        method: 'PUT',
        uri: ENDPOINT + query,
        json: true,
		position1: shadePositionValue
      };
      rp(options);
   });
};

module.exports = WindowShadeHelper;
