var alexa = require('alexa-app');
module.change_code = 1;
var config = require('./config');
var _ = require('lodash');
var WindowShadeHelper = require ('./window_shade_helper');

var app = new alexa.app('windowshades');

app.launch(function(req,res) {
  var prompt = 'Tell me to move a shade or recall a scene.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('sceneintent', {
  'slots': {
    'SCENE': 'NAME'
  },
  'utterances': ['{scene|recall} {-|SCENE}']
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

app.intent('positionintent', {
  'slots': {
    'SHADE': 'SHADENAME',
	'POSITION': 'AMAZON.NUMBER',
  },
  'utterances': ['{|open|close|set|move|position} {-|SHADE} {|to|at|for} {-|POSITION} {|percent}']
},
  function(req, res) {
    var shadeName = req.slot('SHADE');
    var shadePosition = Integer.parseInt(req.slot('POSITION'));
    var reprompt = 'Tell me a shade name and a position percentage.';
    if (_.isEmpty(shadeName) || _.isEmpty(shadePosition)) {
      var prompt = 'I didn\'t catch that? Tell me a shade name and a position percentage.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var shadeHelper = new WindowShadeHelper();
      shadeHelper.setShadePosition(shadeName, shadePosition); 
      res.say('OK.').send();
    }
  }
);

module.exports = app;
