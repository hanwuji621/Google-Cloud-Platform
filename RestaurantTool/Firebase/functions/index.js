// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
//const { Carousel } = require('actions-on-google');
var name_all = [];
var name_all_out = [];

const admin = require("firebase-admin");
admin.initializeApp();

let db = admin.database();
let ref = db.ref("guests");
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to Bin's Hotel !`);
    agent.add(new Card({
        title: `Bin's Hotel`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/naples-grande-palm-pool.jpg?alt=media&token=3767355c-f3c6-4809-ba18-7485b493d9f0',
        text: `Bin's Hotel let you feel more than home.`
        //buttonText: 'This is a button',
        //buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(`What would you like to do today?`);
    agent.add(new Suggestion('Food Service'));
    agent.add(new Suggestion('Book a room'));
    agent.add(new Suggestion('Amenities and facilities'));
    agent.add(new Suggestion('check out'));
    agent.add(new Suggestion('check in'));
    agent.add(new Suggestion('Hotel info'));
    agent.add(new Suggestion('Quit'));
  }
 
  function optionsHandler(agent) {
    agent.add(`Welcome to Bin's Hotel !`);
    agent.add(new Card({
        title: `Bin's Hotel`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/naples-grande-palm-pool.jpg?alt=media&token=3767355c-f3c6-4809-ba18-7485b493d9f0',
        text: `Bin's Hotel let you feel more than home.`
        //buttonText: 'This is a button',
        //buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(`Hey there! What would you like to do?"?`);
    agent.add(new Suggestion('Food Service'));
    agent.add(new Suggestion('Book a room'));
    agent.add(new Suggestion('Amenities and facilities'));
    agent.add(new Suggestion('check out'));
    agent.add(new Suggestion('check in'));
    agent.add(new Suggestion('Hotel info'));
    agent.add(new Suggestion('Quit'));
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function foodServiceHandler(){
    agent.add(`Welcome to Food Service!`);
    agent.add(new Card({
        title: `Food Service`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/vegan-meat-1.jpg?alt=media&token=ed4d802f-8627-4ea9-a621-2b2245fcf55d',
        text: `Bin's Hotel let you feel more than home.`

      })
    );
    agent.add(`What can I do for you?`);
    agent.add(new Suggestion('Show me the menu'));
    agent.add(new Suggestion('House specials'));
    agent.add(new Suggestion('Order food now'));
    agent.add(new Suggestion('book a table'));
    agent.add(new Suggestion('return'));

  }

  function menuHandler(agent){
    agent.add("Here is our menu:");
    agent.add(new Card({
              title: `Big Hamburger`,
              imageUrl: 'https://cdn20.patchcdn.com/users/790386/20180525/063909/styles/T800x600/public/processed_images/shutterstock_337714676-1527287683-3245.jpg',
              text: `Delicious.`

            })
          );
    agent.add(`Price: $15`);

    agent.add(new Card({
              title: `Hot-dog`,
              imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2006/10/20/0/tu0212_dogs2.jpg.rend.hgtvcom.616.462.suffix/1371584101307.jpeg',
              text: `Delicious.`

            })
          );
    agent.add(`Price: $12`);

    agent.add(new Card({
              title: `French Fries`,
              imageUrl: 'http://tasty-yummies.com/wp-content/uploads/2014/03/13390031274_0f663f87cb_o.jpg',
              text: `Delicious.`

            })
          ); 
    agent.add(`Price: $10`);    

    agent.add(new Card({
              title: `Pizza`,
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
              text: `Delicious.`

            })
          );   
    agent.add(`Price: $20`);    

    agent.add(new Suggestion('return'));
  }
  
  function houseSpecialsHandler(agent){
 
    agent.add(new Card({
        title: `Veggie Burger`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Veggie-Burgers_9a.jpg?alt=media&token=97bb6854-a143-4fad-bb38-5fd79e2a6869',
        text: `Delicious.`

      })
    ); 
    agent.add(`Price: $10`); 
     
    agent.add(new Card({
        title: `Beef Tacos`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/e59f255c-7498-4b84-9c9d-e578bf5d88fc.jpeg?alt=media&token=65df7d47-c25c-46ce-96b7-0652061ea4b2',
        text: `Delicious.`

      })
    );   
    agent.add(`Price: $10`); 
 
    agent.add(new Card({
        title: `Peanut Butter Chocolate Dessert`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/exps19201_RDS011700016SC03_13_2b_WEB.webp?alt=media&token=8394ffb1-d09f-4b23-bd9e-c3ffb55cb102',
        text: `Delicious.`

      })
    );   
    agent.add(`Price: $12`);

    agent.add(new Suggestion('return'));

  }

  function bookRoomHandler(agent){
    const peopleNum = agent.parameters.peopleNum;
    const roomTpye = agent.parameters.roomTpye;
    const date = agent.parameters.date;
    const number = agent.parameters.number;
    const givenName = agent.parameters.givenName;

    agent.add(`Great, ${givenName}. You have booked ${number} ${roomTpye} room on ${date}. It is for ${peopleNum} people. Hope you have a good time at Bin's Hotel.`);
    
    agent.add(`if you want to see the Room Pictures, pleses click the buttons below.`);
    agent.add(new Suggestion('Room Pictures'));
    agent.add(new Suggestion('return'));
  }

  function bookRoomPicsHandler(agent){
     
    agent.add(new Card({
        title: `Bed Room`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/hotel-room.webp?alt=media&token=0d6bb21a-eafd-4c18-a62c-fbd12b65aadf',
        text: `Bin's Hotel let you feel more than home.`
     
      })
    );   
 
    agent.add(new Card({
        title: `Washing Room`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/c6wv4ntyzficppltemlh.jpg?alt=media&token=2aa91842-2625-4e2a-a8b7-a3e6d87e3568',
        text: `Bin's Hotel let you feel more than home.`
        
      })
    );   

    agent.add(new Suggestion('return'));  
  }

  function amentitiesHandler(agent){
    agent.add(`Bin's Hotel let you feel more than home.`);
    agent.add(`We have different Amenities and facilities as below`);
    agent.add(new Suggestion('return'));
    agent.add(new Card({
        title: `Language spoken`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Screen%20Shot%202020-03-31%20at%2010.16.12%20AM.png?alt=media&token=6f3617f6-4125-42ec-a4a9-8d3c883a8a14',

      })
    );   
    agent.add(new Card({
        title: `Internet Access`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Screen%20Shot%202020-03-31%20at%2010.16.20%20AM.png?alt=media&token=f939f3fe-3abb-4d53-9c1c-9151ddf3a587',

      })
    );   
    agent.add(new Card({
        title: `Services and Conveniences`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Screen%20Shot%202020-03-31%20at%2010.16.25%20AM.png?alt=media&token=a7964660-4ae1-4ea4-8d34-df0ffd498223',

      })
    );   
    agent.add(new Card({
        title: `Thing to do, Ways to relax`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Screen%20Shot%202020-03-31%20at%2010.16.39%20AM.png?alt=media&token=920c556e-7924-4e1d-a7e0-3e283552fb65',

      })
    );   
    agent.add(new Card({
        title: `Dining, Drinking, and Snacking`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Screen%20Shot%202020-03-31%20at%2010.16.44%20AM.png?alt=media&token=c6355078-5029-443e-9be6-80ac07ac16b3',
      })
    );   
    agent.add(new Card({
        title: `Avaliable in all rooms`,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/restautanttool-tvaclo.appspot.com/o/Screen%20Shot%202020-03-31%20at%2010.16.55%20AM.png?alt=media&token=4e47d47c-3756-4259-85b3-d2cdb64efe12',
      })
    );   
  
  }

  function aboutHotelHandler(agent){
    agent.add(`Bin's Hotel Budapest was opened in August 2006, in the heart of Vancover, within the triangle formed by the bustling pedestrian shopping street,the fascinating Central Market Hall.The hotel is surrounded by the city centre’s elegant shops, cafés, restaurants in addition to excellent transport links`);

    agent.add(`Tel: (604) 888-8888`);
    agent.add(`Address: 555 Seymour St, Vancouver, BC V6B 3H6`);
    agent.add(`Email: BinsHotel@gmail.com`);

    agent.add(new Suggestion('return'));
  }

  function orderFoodHandler(agent){
    const food = agent.parameters.food;
    //const number = agent.paramenters.number;

    agent.add(`Good, you have order ${food}, we are get ready for it, and hand food to your room ontime.  Hope you enjoy the food.`);
    agent.add(new Suggestion('return'));
  }

  function bookTableHandler(agent){
    const time = agent.parameters.time;
    const number = agent.parameters.number;

    agent.add(`Great, you have booked the table at ${time} for ${number} people. We are waiting for your coming.  The restaurant is on the second floor of the hotel.`);
    agent.add(new Suggestion('return'));
  }


  function checkInNameHandler(agent){
    const name = agent.parameters["given-name"];
    let exist = 0;
    name_all.forEach((nameData) =>{
        if(nameData === name){
          exist = 1;
        }
      });

    if(exist === 1){
        agent.add('Welcome, ' + name + '. You have checke in previously, do not need to check in again');
    }else{
        agent.add('Thank you, ' + name + '. You have checked in successfully');
       agent.add('if you want other services, please input: return.');

       return ref.push({
         name: name
       });
    }
       
  }

  function checkInHandler(agent){
    let temp = 0;
    agent.add('Welcome to Bins Hotel, can I have your given name? I will help you to check in.');
    return ref.once("value", (snap) =>{
        snap.forEach((childSnap) =>{
          let name = childSnap.child("name").val();
          name_all[temp] =  name;
          temp++;
        });
      });
  }

  function checkOutHandler(agent){
    let temp = 0;
    agent.add('Can I have your given name? I will help you to check out.');
    return ref.once("value", (snap) =>{
        snap.forEach((childSnap) =>{
          let name = childSnap.child("name").val();
          name_all_out[temp] =  name;
          temp++;
        });
      });
  }

  function checkOutNameHandler(agent){
    const name = agent.parameters["given-name"];
    let exist_out = 0;
    name_all_out.forEach((nameData) =>{
        if(nameData === name){
            exist_out = 1;
        }
      });

    if(exist_out === 1){
        agent.add('Good bye, ' + name + '. we have helped you check out. Welcom to Bins Hotel agian.');
    }else{
        agent.add('Thank you, ' + name + '. You have checked previously or you are not our guest');
       agent.add('if you want other services, please input: return.');
    }
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
  intentMap.set('foodService', foodServiceHandler);
  intentMap.set('menu', menuHandler);
  intentMap.set('houseSpecials', houseSpecialsHandler);
  intentMap.set('options', optionsHandler);
  intentMap.set('menuReturn', foodServiceHandler);
  intentMap.set('houseSpecialsReturn', foodServiceHandler);
  intentMap.set('orderFood', orderFoodHandler);
  intentMap.set('orderFoodReturn', foodServiceHandler);
  intentMap.set('bookTable', bookTableHandler);
  intentMap.set('greeting', optionsHandler);
  intentMap.set('bookRoom', bookRoomHandler);
  intentMap.set('bookRoomReturn', optionsHandler);
  intentMap.set('bookRoomPics', bookRoomPicsHandler);
  intentMap.set('bookRoomPicsReturn', optionsHandler);
  intentMap.set('amentities', amentitiesHandler);
  intentMap.set('amentitiesReturn', optionsHandler);
  intentMap.set('aboutHotel', aboutHotelHandler);
  intentMap.set('aboutHotelReturn', optionsHandler);
  intentMap.set('checkInName', checkInNameHandler);
  intentMap.set('checkIn', checkInHandler);
  intentMap.set('checkInNameReturn', optionsHandler);
  intentMap.set('checkOut', checkOutHandler);
  intentMap.set('checkOutName', checkOutNameHandler);
  
  //intentMap.set('good', googleAssistantOther);

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
