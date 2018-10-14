import test from 'ava';
import notification from '../notification';

const testMessage = 'Hi, Thorsten. How are you feeling about Team 4 right now? Please tell me about it on http://localhost:8000/';
const recipient = '+64225611460';
const sender = '+15105737124';

let error = null;
let response = null;

function callback(err, resp) {
  error = err;
  response = resp;
  console.log(error);
  console.log(response);
}

// The tests seem not able to invoke the sms notification frameworks
test.serial('Send text message with trilio and required parameters will successfully send the message', t => {
  notification.sendTextMessage(testMessage, recipient, sender, callback);
  t.is(this.error, null, `error is not null, but ${this.error}.`);
  t.not(this.response, null, `Response is not null, but ${this.response}.`);
});
