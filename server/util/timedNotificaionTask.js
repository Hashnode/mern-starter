
/* http request session */
import User from '../models/user';
import notification from './notification';

const schedule = require('node-schedule');

// 21749130 Jim's Phone

function getAllUsers(cb) {
  User.find().exec((err, users) => {
    if (err) {
      cb(null);
      return;
    }

    const userlist = {};

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      let list = userlist[user.team];
      if (!list) {
        list = [user];
        userlist[user.team] = list;
      } else {
        list.push(user);
      }
    }
    cb(Object.values(userlist));
  });
}

class TimedNotificationTask {

  list = {};

  sendUserSMS(user) {
    const msg = 'Hi ' + user.name + '. How are you feeling about the happiness right now? Please tell me about it on https://how-is-it.herokuapp.com/';
    const phone = '+64' + user.phone;
    notification.sendTextMessage(msg, phone, '+15105737124', (sms) => {

    });

    const handler = setTimeout(() => {
      this.sendUserSMS(user);
    }, 3 * 60 * 1000);

    this.list[user._id] = handler;
  }

  sendNotification() {
    getAllUsers((users) => {
      if (!users) {
        return;
      }
      for (let i = 0; i < users.length; ++i) {
        const userArray = users[i];
        const interval = 60000 / userArray.length;
        for (let j = 0; j < userArray.length; ++j) {
          setTimeout(() => {
            this.sendUserSMS(userArray[j]);
          }, 1000 * interval * j);
        }
      }
    });
  }

  flush() {
    const handlers = Object.values(this.list);
    for (let i = 0; i < handlers.length; i++) {
      clearTimeout(handlers[i]);
    }
    this.list = {};
  }

  clearNotificationOfUser(userId) {
    delete this.list[userId];
  }

  begin() {
    this.sendNotification();
    // schedule.scheduleJob('* 25 17 * * 1-5', () => {
    //   sendNotification();
    // });
    // schedule.scheduleJob('0 0 18 * * 1-5', () => {
    //   timer.flush();
    // });
  }
}

const timedTask = new TimedNotificationTask();
module.exports = timedTask;
