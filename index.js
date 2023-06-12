// Import dependencies
var config = require ('./config')
var http = require('http');
const Alexa = require('ask-sdk-core');

var endpoint = 'http://' + config.host + '/api/';
var uri = '';

// Request handlers
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'What scene would you like?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('What scene would you like?', speechText)
      .getResponse();
  }
};

const OpenSceneIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpenSceneIntent';
  },
  handle(handlerInput) {
    const scene = Alexa.getSlotValue(handlerInput.requestEnvelope, 'scene');

    //control the shades
    switch(scene) {
      case 'all':
        uri = endpoint + config.openAll;
        break;
      case 'bedroom':
        uri = endpoint + config.openBedroom;
        break;
      case 'stairs':
        uri = endpoint + config.openStairs;
        break;
      case 'living room':
        uri = endpoint + config.openLivingRoom;
        break;
      default:
        // code block
    }
    http.get(uri);

    const speechText = 'Ok.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Ok.', speechText)
      .getResponse();
  }
};

const CloseSceneIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CloseSceneIntent';
  },
  handle(handlerInput) {
    const scene = Alexa.getSlotValue(handlerInput.requestEnvelope, 'scene');

    //control the shades
    switch(scene) {
      case 'all':
        uri = endpoint + config.closeAll;
        break;
      case 'bedroom':
        uri = endpoint + config.closeBedroom;
        break;
      case 'stairs':
        uri = endpoint + config.closeStairs;
        break;
      case 'living room':
        uri = endpoint + config.closeLivingRoom;
        break;
      default:
        // code block
    }
    http.get(uri);

    const speechText = 'Ok.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Ok.', speechText)
      .getResponse();
  }
};

const PartialSceneIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PartialSceneIntent';
  },
  handle(handlerInput) {
    const scene = Alexa.getSlotValue(handlerInput.requestEnvelope, 'scene');

    //control the shades
    uri = endpoint + config.partialAll;
    http.get(uri);

    const speechText = 'Ok.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Ok.', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say Open the Living Room Shades or Close All the Shades';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('You can say Open the Living Room Shades or Close All the Shades', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Any clean-up logic goes here.
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I don\'t understand your command. Please say it again or ask me for help.')
      .reprompt('Sorry, I don\'t understand your command. Please say it again or ask me for help.')
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    OpenSceneIntentHandler,
    CloseSceneIntentHandler,
    PartialSceneIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();