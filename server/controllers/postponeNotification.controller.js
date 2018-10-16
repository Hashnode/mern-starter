/* eslint-disable no-trailing-spaces */
import User from '../models/user';
import notification from '../util/notification';
import timedNotificationTask from '../util/timedNotificaionTask';

export function messageContentIs5_or_10_or_20(message) {
  const permittedDelays = ['5', '10', '20'];
  return message !== 'undefined' && permittedDelays.includes(message);
}

function increasePostponedTimeForUser(user, postponeTimeInMilliseconds) {
  user.postponedTimeForSchedule += postponeTimeInMilliseconds;
  user.save();
}

export function getPostponeTimeInMilliseconds(restTimeForUserToPostpone, requestedPostponeTime) {
  const postponeTime = restTimeForUserToPostpone >= requestedPostponeTime ? requestedPostponeTime : restTimeForUserToPostpone;
  return postponeTime * 60 * 1000;
}

export function postponeNotification(req, res) {
  const requestedPostponeTime = req.body.Body;
  const userPhoneNumber = req.body.From;
  const twilioPhoneNumber = '+15105737124';

  const maximumPostponeTimeForOneSchedule = 60;
  const invalidContentMessage = 'Thank you for your message. Unfortunately we didn\'t get you. ' +
    'If you want to postpone your reminder please reply with \'5\', \'10\' or \'20\' and nothing else.';
  const userUnknownMessage = 'Thank you for your message. Unfortunately we don\'t know who you are. ' +
    'If you tried to reach how-is-it.heroku.com please make sure, that you use a registered phone number and contact the admin.';
  const postponeTimeExceededMessage = `We are sorry but you already postponed your reminders for this schedule for the maximum 
  of ${maximumPostponeTimeForOneSchedule}. Please input your happiness data before the postponing of reminders is allowed again.`;

  console.log(`The following message was received as sms: ${requestedPostponeTime.toString()} from ${userPhoneNumber.toString()}.`);

  // message format correct?
  if (!messageContentIs5_or_10_or_20(requestedPostponeTime)) {
    notification.sendTextMessage(invalidContentMessage, userPhoneNumber, twilioPhoneNumber, () => {
    });
    res.send({ success: false, code: 0, message: 'invalid content' });
    return;
  }
  const userPhoneNumberWithoutCountryCode = userPhoneNumber.substr(3); // cut of +64
  // find User
  User.findOne({ phone: userPhoneNumberWithoutCountryCode }).exec((err, user) => {
    // user unknown?
    if (user === 'undefined' || user === null) {
      notification.sendTextMessage(userUnknownMessage, userPhoneNumber, twilioPhoneNumber, () => {});
      res.send({ success: false, code: 0, message: 'unknown phone number' });
      return;
    }
    // postpone time exceeded?
    const usersPostponedTimeForSchedule = user.postponedTimeForSchedule !== 'undefined' && user.postponedTimeForSchedule !== null ? user.postponedTimeForSchedule : 0;
    const restTimeForUserToPostpone = maximumPostponeTimeForOneSchedule - usersPostponedTimeForSchedule;
    if (restTimeForUserToPostpone === 0) {
      notification.sendTextMessage(postponeTimeExceededMessage, userPhoneNumber, twilioPhoneNumber, () => {});
      res.send({ success: false, code: 0, message: 'postpone time exceeded' });
      return;
    }
    // postpone notification
    const postponeTimeInMilliseconds = getPostponeTimeInMilliseconds(restTimeForUserToPostpone, requestedPostponeTime);
    increasePostponedTimeForUser(user, postponeTimeInMilliseconds);
    timedNotificationTask.postponeNotificationForUser(user.id, postponeTimeInMilliseconds);
  });
}
