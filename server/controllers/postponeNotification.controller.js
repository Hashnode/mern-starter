import User from '../models/user';
import notification from '../util/notification';
import timedNotificationTask from '../util/timedNotificaionTask';

function messageContentIs5_or_10_or_20(message) {
  const permittedDelays = [5, 10, 20];
  return message !== 'undefined' && Number.isInteger(message) && permittedDelays.includes(message);
}

export async function postponeNotification(req) {
  const messageBody = req.body.Body;
  const senderNumber = req.body.From;

  const messageInvalidContent = 'Thank you for your message. Unfortunately we didn\'t get you. ' +
    'If you want to postpone your reminder please reply with \'5\', \'10\' or \'20\' and nothing else.';
  const messageUserUnknown = 'Thank you for your message. Unfortunately we don\'t know who you are. ' +
    'If you tried to reach how-is-it.heroku.com please make sure, that you use a registered phone number and contact the admin.';

  if (!messageContentIs5_or_10_or_20(messageBody)) {
    notification.sendTextMessage(messageInvalidContent, senderNumber, '+15105737124', () => {});
  } else {
    // find User
    const user = await User.findOne({ phone: senderNumber }).exec();
    if (user === 'undefined' || user === null) {
      notification.sendTextMessage(messageUserUnknown, senderNumber, '+15105737124', () => {});
    } else {
      const postponeTimeInMilliseconds = messageBody * 60 * 1000;
      timedNotificationTask.postponeNotificationForUser(user.id, postponeTimeInMilliseconds);
      // increase postponing time to user in db
    }
  }
  console.log(`The following message was received as sms: ${messageBody.toString()} from ${senderNumber.toString()}.`);
}
