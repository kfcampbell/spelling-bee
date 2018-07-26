require('babel-polyfill');

const Alexa = require('ask-sdk-core');

const { words } = require('./words');

const getRandomWord = () => {
  return words[Math.floor(Math.random() * Math.floor(words.length))];
};

let currWord = getRandomWord();

/* INTENT HANDLERS */
const SpellWordRequestHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'spell_word_intent'
    );
  },
  handle(handlerInput) {
    let speechText = 'Uh oh. Keegan messed something up';

    if (handlerInput.requestEnvelope.request.intent.slots.letter.value) {
      let spelling = handlerInput.requestEnvelope.request.intent.slots.letter.value;
      const isCorrectSpelling = spelling.toLowerCase() === currWord.word;

      if (isCorrectSpelling) {
        currWord = getRandomWord();
        speechText = `You got it! Congratulations. Your new word is ${currWord.word}`;
      } else {
        speechText =
          "Wow you really suck at this. If you think it might help your terrible spelling, you can say: use it in a sentence, or what's the word's etymology?";
      }
    } else {
      speechText = 'Uhh...did you even spell anything?';
    }

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse()
    );
  }
};

const EtymologyRequestHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'etymology_intent'
    );
  },
  handle(handlerInput) {
    const speechText = currWord.etymology;
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const SentenceRequestHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'use_in_sentence_intent'
    );
  },
  handle(handlerInput) {
    const speechText = currWord.sentence;
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = `Your current word is ${
      currWord.word
    }. To spell it, say: spell word, followed by the spelling of the word.`;

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
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
    SentenceRequestHandler,
    EtymologyRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SampleRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
