var alexa = require('alexa-app');
module.change_code = 1;
var config = require('./config');
var _ = require('lodash');
var WindowShadeHelper = require ('./window_shade_helper');

var app = new alexa.app('windowshades');

app.launch(function(req,res) {
  var prompt = 'Hello.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('sceneintent', {
  'slots': {
    'SCENE': 'NAME'
  },
  'utterances': ['{|for|to} {scene|recall|go} {|to} {-|SCENE}']
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
    'POSITION': 'AMAZON.NUMBER'
  },
  'utterances': ['{|crack|set|move|position} {-|SHADE} {|to|at} {-|POSITION} {|percent}']
},
  function(req, res) {
    var shadeName = req.slot('SHADE');
    var shadePosition = parseInt(req.slot('POSITION'), 10);
    var reprompt = 'Tell me a shade name and a position percentage.';
    if (_.isEmpty(shadeName)) {
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

app.intent('openintent', {
  'slots': {
    'SHADE': 'SHADENAME'
  },
  'utterances': ['{open} {-|SHADE}']
},
  function(req, res) {
    var shadeName = req.slot('SHADE');
    var reprompt = 'Which shade would you like to open?';
    if (_.isEmpty(shadeName)) {
      var prompt = 'I didn\'t catch that. Which shade would you like to open?';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var shadeHelper = new WindowShadeHelper();
      shadeHelper.setShadePosition(shadeName, 100);
      res.say('OK.').send();
    }
  }
);

app.intent('closeintent', {
  'slots': {
    'SHADE': 'SHADENAME'
  },
  'utterances': ['{close|shut} {-|SHADE}']
},
  function(req, res) {
    var shadeName = req.slot('SHADE');
    var reprompt = 'Which shade would you like to close?';
    if (_.isEmpty(shadeName)) {
      var prompt = 'I didn\'t catch that. Which shade would you like to close?';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var shadeHelper = new WindowShadeHelper();
      shadeHelper.setShadePosition(shadeName, 0);
      res.say('OK.').send();
    }
  }
);

module.exports = app;
