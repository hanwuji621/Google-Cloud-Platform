
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
var setNumber;
var min;
var max;
var attempt;
var guessNumber;


const admin = require("firebase-admin");
admin.initializeApp();
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'ws://love-tvbrsg.firebaseio.com/',
// });

let db = admin.database();
let ref = db.ref("games");
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.webnumberGuessDatabase = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to play number guessing`);
    agent.add(`if you want to start a new game, please input: new start`);
    agent.add(`if you want to resume the game, please input: resume`);
    agent.add(new Suggestion(`new start`));
    agent.add(new Suggestion(`resume`));
  }

  function fallback(agent) {
    agent.add(`webhook:I didn't understand`);
    agent.add(`webhook:I'm sorry, can you try again?`);
  }

  function startGuessHandler(agent){
    min = agent.parameters.min;
    max = agent.parameters.max;
    attempt = 0;
    agent.add(`pick a number between ${min} and ${max}`);
    setNumber = Math.floor(Math.random()*(max - min) + min);
    agent.add('hint: ' + `${setNumber}`);
  }

  function pickNumber(agent){
    guessNumber = agent.parameters.number;
    attempt++;
    if (setNumber !== guessNumber)
    {
      if(guessNumber < setNumber)
      {
        min = guessNumber;
        agent.add('nice try!');
        agent.add(`previous guessing number: ` + guessNumber);
        agent.add(`hint: guess a higher number`);
        agent.add('attempt times: ' + attempt);
        agent.add(`pick a number between ${min} and ${max}`);
        agent.add(`   `);
        agent.add(`if you want to save game, please click the button bellow`);

        agent.add(new Suggestion('save'));
      }
      else
      {
        max = guessNumber;
        agent.add('nice try!');
        agent.add(`previous guessing number: ` + guessNumber);
        agent.add(`hint: guess a lower number`);
        agent.add('attempt times: ' + attempt);
        agent.add(`pick a number between ${min} and ${max}`);
        agent.add(`   `);
        agent.add(`if you want to save game, please click the button bellow`);
        agent.add(new Suggestion('save'));
      }

    }
    else
    { 
      agent.add(`congratulation`);
      agent.add(`${guessNumber} is right`);
    }
  }


  function setName(agent){
    let session = agent.session;
      let name = agent.parameters["given-name"];
      let key = session.substring(session.lastIndexOf('/') + 1).replace("-", "_");

      agent.add(`you name, number of guess, and target number are all saved`);
      agent.add(`    `);
      agent.add(`if you want to start a new game, please input: new start`);
      agent.add(`if you want to resume the game, please input: resume`);
      agent.add(new Suggestion(`new start`));
      agent.add(new Suggestion(`resume`));
      let obj = {};
      obj[key] = {name: name,
                  attempt: attempt,
                  setNumber: setNumber,
                  guessNumber:guessNumber,
                  max: max,
                  min: min
    };

      return ref.set(obj);
  }


  function resumeGameHandler(agent)
  {
      let session = agent.session;
      let key = session.substring(session.lastIndexOf('/') + 1).replace("-", "_");
      
      return db.ref("games/" + key).once("value", (snapshot) =>
      {
          let name = snapshot.child("name").val();
          min = snapshot.child("min").val();
          max = snapshot.child("max").val();
          attempt = snapshot.child("attempt").val();
          setNumber = snapshot.child("setNumber").val();
          guessNumber = snapshot.child("guessNumber").val();

          agent.add(`welcome back, ` + name + `. Continuce the previous game.`);
          agent.add('attempt times: ' + attempt);
          agent.add(`previous guessing number: ` + guessNumber);
          agent.add(`pick a number between ${min} and ${max}`);
          agent.add(`   `);
          agent.add(`if you want to save game, please click the button bellow`);
          agent.add(new Suggestion('save'));
      });

  }





  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('startGuess',startGuessHandler);
  intentMap.set('resumeGame', resumeGameHandler);
  intentMap.set('pick a number', pickNumber);
  intentMap.set('set a name', setName);
  //intentMap.set('saveGame', saveGame);



  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});




