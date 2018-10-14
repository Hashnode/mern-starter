
/* http request session */
import User from '../models/user';
import notification from './notification';
import Team from '../models/team';

//const schedule = require('node-schedule');

// 21749130 Jim's Phone

const isDevMode = process.env.NODE_ENV === 'development' || false;

const interfaces = require('os').networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
let IPv4 = '';
for (const devName in interfaces) {
  const iface = interfaces[devName];
  for (let i = 0; i < iface.length; i++) {
    const alias = iface[i];
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
      IPv4 = alias.address;
    }
  }
}

const serverAddress = isDevMode ? 'http://' + IPv4 + ':8000/?' : 'https://how-is-it.herokuapp.com/?';

function getAllUsers(cb) {
  User.find().populate({ path: 'team', model: Team, select: { name: 1, _id: 1 } }).exec((err, users) => {
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
    let msg = 'Hi ';
    msg += user.name;
    msg += '. How are you feeling about the happiness right now? Please tell me about it on ';

    let server = serverAddress;
    server += 'u=';
    server += user.name;
    server += '&t=';
    server += user.team.name;
    server += '&s=';
    server += user.id;
    server = encodeURI(server);

    const twilioPhoneNumber = '+15105737124';
    const postponeInfo = ` or postpone it by sending \'5\', \'10\' or \'20\' to  ${twilioPhoneNumber}`;

    let phone = '+64';
    phone += user.phone;
    notification.sendTextMessage(msg + server + postponeInfo, phone, twilioPhoneNumber, (sms) => {

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
