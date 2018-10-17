/* http request session */
import User from '../models/user';

class Session {
  constructor() {
    this.list = {
      cjmah9iu8000146gz0tbav7ki: 1
    };
  }


  /**
   * async - get login session
   * @param sessionId
   * @param cb
   */
  get(sessionId, cb) {
    if (!sessionId) {
      cb(null);
      return;
    }
    if (this.list[sessionId] !== 1) {
      cb(null);
      return;
    }

    User.findOne({ id: sessionId }).exec((err, user) => {
      if (err) {
        cb(null);
      } else {
        cb(user);
      }
    });
  }

  put(sessionId) {
    if (!sessionId) {
      return false;
    }
    this.list[sessionId] = 1;
    return true;
  }

  remove(sessionId) {
    delete this.list[sessionId];
  }
}

const session = new Session();
module.exports = session;
