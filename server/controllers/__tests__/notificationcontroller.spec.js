import test from 'ava';
import sendTextMessage from '../notification.controller';

test.serial('Send text message with required parameters will successfully send the message', t => {
  const testMessage = 'How is it in Team 4? Please tell me about it on http://localhost:8000/';
  const recipient = '+64225611460';
  const sender = 'How is it';

  const success = sendTextMessage(testMessage, recipient, sender);
  t.is(success, null, `Success is not null, but ${success.toString()}`);
});
