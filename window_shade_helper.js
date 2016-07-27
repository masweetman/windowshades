'use strict';
var config = require('./config');
var rp = require('request-promise');
var ENDPOINT = 'http://' + config.powerViewIP + '/api/';

function WindowShadeHelper () {
};

WindowShadeHelper.prototype.getScene = function(sceneId) {
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
