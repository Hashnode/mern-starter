const accountSid = 'ACd7451db25e4af5611895d69d42c2d6d4'; // Your Account SID from www.twilio.com/console
const authToken = 'd3094298e342cddebaeac56f27b3bdd3';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio')(accountSid, authToken);

export class notification {
  static sendTextMessage(message, recipient, sender, cb) {
    twilio.messages
      .create({
        body: message,
        from: sender,
        to: recipient,
      })
      .then((msg) => cb(msg))
      .done();
  }
}

// ################ How to run tests for the above functions ###############
// Just for testing purposes -> uncomment the block and comment export default and delete the 'export' before class
// To execute the test run: node server/util/notification.js
/* const testMessage = 'Hi, Thorsten. How are you feeling about Team 4 right now? Please tell me about it on http://localhost:8000/';
const user = '+64225611460';
const originator = '+15105737124';

function callback(error, response) {
  console.log(error);
  console.log(response);
}

notification.sendTextMessage(testMessage, user, originator, callback); */


export default notification;
