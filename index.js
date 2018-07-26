require('babel-polyfill');

const Alexa = require('ask-sdk-core');

const words = ['mastodon', 'allosaurus', 'raptor'];
let currWord = words[0];

/* INTENT HANDLERS */
const SpellWordRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'spell_word_intent';
  },
  handle(handlerInput) {
    console.log('inside spell word request', JSON.stringify(handlerInput));
    let speechText = 'Uh oh. Keegan messed something up';

    if(handlerInput.requestEnvelope.request.intent.slots.letter.value) {
      let spelling = handlerInput.requestEnvelope.request.intent.slots.letter.value;
      const isCorrectSpelling = spelling.toLowerCase() === currWord;
      speechText = isCorrectSpelling ? 'You got it! Congratulations!' : 'Wow you really suck at this.';
    } else {
      speechText = 'Uhh...did you even spell anything?';
    }

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        //.withSimpleCard('Hello World', speechText)
        .getResponse()
    );
  }
};


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    //const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
    const speechText = `Your current word is ${currWord}. To spell it, say: spell word, followed by the spelling of the word.`;

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
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'sample_intent'
    );
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

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speechText = 'Welp. See you later!';
    return (
      handlerInput.responseBuilder
        .speak(speechText)
        //.withSimpleCard('Hello World', speechText)
        .getResponse()
    );
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speechText = "You're in the help intent!";
    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        //.withSimpleCard('Hello World', speechText)
        .getResponse()
    );
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
  .addRequestHandlers(
    LaunchRequestHandler,
    SpellWordRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SampleRequestHandler
  )
  //.addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
