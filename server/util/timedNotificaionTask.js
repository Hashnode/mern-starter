
/* http request session */
import User from '../models/user';
import notification from './notification';
import Team from '../models/team';

// const schedule = require('node-schedule');

// 21749130 Jim's Phone

let timeRangeForTeam = 5 * 60 * 1000;  // 5 minutes
let nextNotificationTime = 3 * 60 * 1000;  // 3 minutes


const isDevMode = process.env.NODE_ENV === 'development' || false;

const interfaces = require('os').networkInterfaces();
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

// host ip address
const serverAddress = isDevMode ? 'http://' + IPv4 + ':8000/?' : 'https://how-is-it.herokuapp.com/?';


/**
 * query all users from database
 * @param cb
 */
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

/**
 * query a user from database
 * @param userId
 * @param cb
 */
function getUserById(userId, cb) {
  User.findOne({ id: userId }).populate({ path: 'team', model: Team, select: { name: 1, _id: 1 } }).exec((err, user) => {
    if (err) {
      cb(null);
      return;
    }
    cb(user);
  });
}

function resetUsersPostponedTimeForSchedule(userId) {
  User.findOne({ id: userId }).exec((err, user) => {
    user.postponedTimeForSchedule = 0;
    user.save();
  });
}

class TimedNotificationTask {

  list = {};

  /**
   * send notification to a user
   * @param user
   */
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
    }, nextNotificationTime);

    this.list[user.id] = handler;
  }

  /**
   * send notification to all users
   */
  sendNotification() {
    getAllUsers((users) => {
      if (!users) {
        return;
      }

      for (let i = 0; i < users.length; ++i) {
        const userArray = users[i];
        const interval = timeRangeForTeam / userArray.length;
        for (let j = 0; j < userArray.length; ++j) {
          const sendingTime = (Math.random() + j) * interval;
          console.log(`message will be sent within: ${sendingTime / 1000} for user: ${userArray[j].name}`);
          setTimeout(() => {
            this.sendUserSMS(userArray[j]);
          }, sendingTime);
        }
      }
    });
  }

  /**
   * clear all awaiting notification tasks
   */
  flush() {
    const handlers = Object.values(this.list);
    for (let i = 0; i < handlers.length; i++) {
      clearTimeout(handlers[i]);
    }
    this.list = {};
  }

  /**
   * stop sending notification to user
   * @param userId
   */
  clearNotificationOfUser(userId) {
    const handler = this.list[userId];
    if (!handler) {
      return;
    }
    clearTimeout(handler);
    delete this.list[userId];
    resetUsersPostponedTimeForSchedule(userId);
  }

  /**
   * postpone a notification for a user
   * @param userId
   * @param postponeTime if 5 minutes, it is 5*60*1000
   */
  postponeNotificationForUser(userId, postponeTime) {
    if (!userId || !postponeTime) {
      console.log(`invalid userId: ${userId} or postponeTime: ${postponeTime}`);
      return;
    }

    let handler = this.list[userId];
    if (!handler) {
      console.log(`can not find task for user: ${userId}`);
      return;
    }

    clearTimeout(handler);

    getUserById(userId, (user) => {
      if (!user) {
        return;
      }
      handler = setTimeout(() => {
        this.sendUserSMS(user);
      }, postponeTime);

      this.list[userId] = handler;
    });
  }

  /**
   * start to run notification tasks
   */
  begin() {
    //this.sendNotification();
    // schedule.scheduleJob('* 25 17 * * 1-5', () => {
    //   sendNotification();
    // });
    // schedule.scheduleJob('0 0 18 * * 1-5', () => {
    //   timer.flush();
    // });
  }

  beginWithNextNotificationTimeAndTeamTimeLength(time, length) {
    this.flush();
    timeRangeForTeam = length * 60 * 1000;
    nextNotificationTime = time * 60 * 1000;
    this.sendNotification();
  }
}

const timedTask = new TimedNotificationTask();
module.exports = timedTask;
