require('babel-polyfill');

const Alexa = require('ask-sdk-core');

/* INTENT HANDLERS */

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        //.withSimpleCard('Hello World', speechText)
        .getResponse()
    );
  }
};

const SampleRequestHandler = {
  canHandle(handlerInput) {
    console.log('handler input:', JSON.stringify(handlerInput));
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'sample_intent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    console.log('request attributes', requestAttributes);
    console.log('session attributes', sessionAttributes);

    return handlerInput.responseBuilder
      .speak('you got the sample output')
      .reprompt('here is some reprompt output')
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  }
};

/* LAMBDA SETUP */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, SampleRequestHandler)
  //.addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
