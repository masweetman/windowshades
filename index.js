var alexa = require('alexa-app');
module.change_code = 1;
var config = require('./config');
var _ = require('lodash');
var WindowShadeHelper = require ('./window_shade_helper');

var app = new alexa.app('windowshades');

app.launch(function(req,res) {
  var prompt = 'Tell me to open or close a window.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('openintent', {
  'slots': {
    'SCENEOPEN': 'OPENNAME'
  },
  'utterances': ['{|open} {-|SCENEOPEN}']
},
  function(req, res) {
    var sceneName = req.slot('SCENEOPEN');
    var reprompt = 'Tell me which window to open.';
    if (_.isEmpty(sceneName)) {
      var prompt = 'I didn\'t catch that? Tell me which window to open.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var shadeHelper = new WindowShadeHelper();
      shadeHelper.getScene(sceneName); 
      res.say('OK.').send();
    }
  }
);

app.intent('closeintent', {
  'slots': {
    'SCENECLOSE': 'CLOSENAME'
  },
  'utterances': ['{|close} {-|SCENECLOSE}']
},
  function(req, res) {
    var sceneName = req.slot('SCENECLOSE');
    var reprompt = 'Tell me which window to close.';
    if (_.isEmpty(sceneName)) {
      var prompt = 'I didn\'t catch that? Tell me which window to close.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var shadeHelper = new WindowShadeHelper();
      shadeHelper.getSceneCollection(sceneName);
      res.say('Closing' + sceneName + '.').send();
    }
  }
);

module.exports = app;
