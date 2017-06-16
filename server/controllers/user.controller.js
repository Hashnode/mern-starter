import User from '../models/user';
import cuid from 'cuid';

/**
 * Get one user by email
 * @param email
 * @param callback
 * @param error
 * @returns void
 */
function getUser(email, callback, error) {
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      error();
    } else {
      callback({ user });
    }
  });
}

/**
 * Add/update user
 * @param req
 * @param res
 * @returns void
 */
export function signinUser(req, res) {
  if (!req.body.profile || !req.body.profile.email) {
    res.status(403).end();
  }

  getUser(
    req.body.profile.email,
    // update user's last visit date
    (user) => {
      const newData = req.body.profile;
      newData.dateLastVisited = Date.now();
      User.findOneAndUpdate({ email: req.body.profile.email }, newData, (err, item) => {
        if (err) return res.send(500, { error: err });
        res.json({ user: item });
      });
    },
    // create new user
    () => {
      const newUser = new User(req.body.profile);
      newUser.cuid = cuid();

      newUser.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ user: saved });
      });
    }
  );
}
