var alexa = require('alexa-app');
module.change_code = 1;
var config = require('./config');
var _ = require('lodash');
var WindowShadeHelper = require ('./window_shade_helper');

var app = new alexa.app('windowshades');

app.launch(function(req,res) {
  var prompt = 'Tell me which scene you\'d like.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('sceneintent', {
  'slots': {
    'SCENE': 'NAME'
  },
  'utterances': ['{|open|close} {-|SCENE}']
},
  function(req, res) {
    var sceneName = req.slot('SCENE');
    var reprompt = 'Tell me which scene you\'d like.';
    if (_.isEmpty(sceneName)) {
      var prompt = 'I didn\'t catch that? Tell me a scene name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var shadeHelper = new WindowShadeHelper();
      shadeHelper.getScene(sceneName); 
      res.say('OK.').send();
    }
  }
);

module.exports = app;
