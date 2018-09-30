/* http request session */
import User from '../models/user';

class Session {
  constructor() {
    this.list = {
      cjmah9iu8000146gz0tbav7ki: 1,
      cjmah9iu8000146gz0tbav7kj: 1
    };
  }

  get(req) {
    if (!req.session.sessionid) {
      return { session: false, user: null };
    }
    if (this.list[req.session.sessionid] != '1') {
      return { session: false, user: null };
    }
    User.find({ id: req.session.sessionid }).exec((err, user) => {
      if (err) {
        return { session: false, user: null };
      } else {
        return { session: true, user: user };
      }
    });
  }
}

const session = new Session();
module.exports = session;
