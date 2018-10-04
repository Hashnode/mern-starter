import User from '../models/user';
import Team from '../models/team';
import sanitizeHtml from 'sanitize-html';
import cuid from 'cuid';
import session from '../util/session';
import notification from '../util/notification';

/* public */
export function checkSession(req, res) {
  if (req.session.sessionid === 'cjmah9iu8000146gz0tbav7ki') {
    res.send({ code: 1, success: true, message: 'valid session' });
  }
  res.send({ code: 0, success: false, message: 'expired session' });
}

export function checkAdmin(req, res) {
  const password = req.body.password;
  if (password !== '1') {
    res.send({ success: false });
  } else {
    req.session.sessionid = 'cjmah9iu8000146gz0tbav7ki';
    res.send({ success: true });
  }
}

export function userList(req, res) {
  User.find().populate({ path: 'team', model: Team, select: { name: 1, _id: 1 } }).exec((err, users) => {
    if (err) {
      res.send({
        success: false, code: 0, message: err,
      });
    } else {
      res.send({
        success: true, code: 1, message: users,
      });
    }
  });
}

export function addUser(req, res) {
  if (!req.body.name) {
    res.send({
      success: false,
      code: 0,
      message: 'please input user name',
    });
    return;
  }

  const newUser = new User(req.body);
  newUser.id = cuid();
  newUser.name = sanitizeHtml(newUser.name);
  newUser.phone = sanitizeHtml(newUser.phone);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.team = sanitizeHtml(newUser.team);

  newUser.save((err) => {
    if (err) {
      res.send({
        success: false, code: 0, message: err,
      });
    } else {
      res.send({
        success: true, code: 1, message: 'user added',
      });
    }
  });
}

export function editUser(req, res) {
  if (!req.body.name) {
    res.send({
      success: false,
      code: 0,
      message: 'please input user name',
    });
    return;
  }

  User.findOne({ id: req.body.id }).exec((err, user) => {
    if (err) {
      res.send({ success: false, code: 0, message: err });
    }

    user.update({ name: req.body.name, phone: req.body.phone, email: req.body.email, team: req.body.team }, () => {
      res.send({ success: true, code: 1, message: 'update success' });
    });
  });
}

export function deleteUser(req, res) {
  User.findOne({ id: req.body.id }).exec((err, user) => {
    if (err) {
      res.send({ success: false, code: 0, message: err });
    }

    user.remove(() => {
      res.send({ success: true, code: 1, message: 'delete success' });
    });
  });
}

export function sendSMS(req, res) {
  if (!req.body.text) {
    res.send({ success: false, code: 0, message: 'no text body' });
    return;
  }

  session.get(req.session.sessionid, (user) => {
    if (!user) {
      res.send({ success: false, code: 0, message: 'please login in' });
      return;
    }
    notification.sendTextMessage(req.body.text, '+64'+user.phone, '+15105737124', (msg) => {
      if (msg) {
        res.send({ success: true, code: 1, message: 'message send' });
      } else {
        res.send({ success: false, code: 0, message: 'message send failed' });
      }
    });
  });
}
