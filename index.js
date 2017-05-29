var alexa = require('alexa-app');
module.change_code = 1;
var config = require('./config');
var _ = require('lodash');
var WindowShadeHelper = require ('./window_shade_helper');

var app = new alexa.app('windowshades');
var shadeHelper = new WindowShadeHelper();
var prompt = '';
var reprompt = '';
var sceneName = '';
var shadeName = '';
var shadePosition = 0;
 
app.launch(function(req, res) {
  prompt = 'Welcome to window shade control.';
  res.say(prompt).reprompt('You can say open bedroom shades or set bottom living room shade to 25%.').shouldEndSession(false);
});

var exitFunction = function(req, res) {
  prompt = 'Bye.';
  res.say(prompt);
};
app.intent('AMAZON.StopIntent', exitFunction);
app.intent('AMAZON.CancelIntent', exitFunction);

app.intent('sceneintent', {
  'slots': {
    'SCENE': 'SCENENAME'
  },
  'utterances': ['{|for} {|scene|recall|go} {|to} {-|SCENE}']
},
  function(req, res) {
    sceneName = req.slot('SCENE');
    reprompt = 'Tell me which scene you\'d like.';
    if (_.isEmpty(sceneName)) {
      prompt = 'I didn\'t catch that? Tell me a scene name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      shadeHelper.getScene(sceneName); 
      prompt = 'Ok.';
      res.say(prompt);
    }
  }
);

app.intent('positionintent', {
  'slots': {
    'SHADE': 'SHADENAME',
    'POSITION': 'AMAZON.NUMBER'
  },
  'utterances': ['{set|move|adjust} {-|SHADE} {|to|at} {-|POSITION} {|percent}']
},
  function(req, res) {
    shadeName = req.slot('SHADE');
    shadePosition = parseInt(req.slot('POSITION'), 10);
    reprompt = 'Tell me a shade name and a position percentage.';
    if (_.isEmpty(shadeName)) {
      prompt = 'I didn\'t catch that? Tell me a shade name and a position percentage.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      shadeHelper.setShadePosition(shadeName, shadePosition); 
      prompt = 'OK.';
      res.say(prompt).reprompt(prompt).shouldEndSession(false);
    }
  }
);

app.intent('openintent', {
  'slots': {
    'SHADE': 'SHADENAME'
  },
  'utterances': ['{raise} {-|SHADE}']
},
  function(req, res) {
    shadeName = req.slot('SHADE');
    reprompt = 'Which shade would you like to raise?';
    if (_.isEmpty(shadeName)) {
      prompt = 'I didn\'t catch that. Which shade would you like to raise?';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      shadeHelper.setShadePosition(shadeName, 100);
      prompt = 'OK.';
      res.say(prompt).reprompt(prompt).shouldEndSession(false);
    }
  }
);

app.intent('closeintent', {
  'slots': {
    'SHADE': 'SHADENAME'
  },
  'utterances': ['{lower|shut} {-|SHADE}']
},
  function(req, res) {
    shadeName = req.slot('SHADE');
    reprompt = 'Which shade would you like to lower?';
    if (_.isEmpty(shadeName)) {
      prompt = 'I didn\'t catch that. Which shade would you like to lower?';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      shadeHelper.setShadePosition(shadeName, 0);
      prompt = 'OK.';
      res.say(prompt).reprompt(prompt).shouldEndSession(false);
    }
  }
);



module.exports = app;
