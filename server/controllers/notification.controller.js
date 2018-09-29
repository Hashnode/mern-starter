const messagebird = require('messagebird')('9JoazGaGY5c3ffa2NxEdxfY1I');

export default function sendTextMessage(message, recipient, sender) {
  return messagebird.messages.create({
    originator: sender,
    recipients: [recipient],
    body: message,
  }, (err, response) => {
    if (err) {
      // Request has failed
      console.log(err);
    } else {
      // Request was successful
      console.log(response);
      return null;
    }
    return err;
  });
}
