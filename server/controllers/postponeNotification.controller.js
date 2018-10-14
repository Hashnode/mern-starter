import User from '../models/user';
import notification from '../util/notification';

function messageContentIs5_or_10_or_20(message) {
  const permittedDelays = [5, 10, 20];
  return message !== 'undefined' && Number.isInteger(message) && permittedDelays.includes(message);
}


// export async function postponeNotification(req, res) {
//   const body = req.body.Body;
//   const sender = req.body.From;
//
//   const messageInvalidContent = 'Thank you for your message. Unfortunately we didn\'t get you. ' +
//     'If you want to postpone your reminder please reply with \'5\', \'10\' or \'20\' and nothing else.';
//   const messageUserUnknown = 'Thank you for your message. Unfortunately we don\'t know who you are. ' +
//     'If you tried to reach how-is-it.heroku.com please make sure, that you use a registered number and contact the admin.';
//
//   if (!messageContentIs5_or_10_or_20(body)) {
//     notification.sendTextMessage(messageInvalidContent, sender, '+15105737124', () => {});
//   } else {
//     // find User
//     const user = await User.findOne({ phone: sender }).exec();
//     if (user === 'undefined' || user === null) {
//       notification.sendTextMessage(messageUserUnknown, sender, '+15105737124', () => {});
//     } else {
//       // find Usertask and postpone
//     }
//   }
//   console.log(`The following message was received as sms: ${body.toString()} from ${sender.toString()}.`);
// }

export function postponeNotification(req, res) {
  const body = req.body.Body;
  const sender = req.body.From;

  const messageInvalidContent = 'Thank you for your message. Unfortunately we didn\'t get you. ' +
    'If you want to postpone your reminder please reply with \'5\', \'10\' or \'20\' and nothing else.';
  const messageUserUnknown = 'Thank you for your message. Unfortunately we don\'t know who you are. ' +
    'If you tried to reach how-is-it.heroku.com please make sure, that you use a registered number and contact the admin.';

  if (!messageContentIs5_or_10_or_20(body)) {
    notification.sendTextMessage(messageInvalidContent, sender, '+15105737124', () => {});
  } else {
    // find User
    User.findOne({ phone: sender }).exec((err, user) => {
      if (user === 'undefined' || user === null) {
        notification.sendTextMessage(messageUserUnknown, sender, '+15105737124', () => {});
      } else {
        // find Usertask and postpone
      }
    });
  }
  console.log(`The following message was received as sms: ${body.toString()} from ${sender.toString()}.`);
}
