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
  console.log(3, email);
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      error();
    }
    callback({ user });
  });
}

/**
 * Add/update user
 * @param req
 * @param res
 * @returns void
 */
export function signinUser(req, res) {
  console.log(2);
  if (!req.body.profile || !req.body.profile.email) {
    res.status(403).end();
  }

  getUser(
    req.body.profile.email,
    // update user's last visit date
    (user) => {
      console.log(user);
      // TODO: update
    },
    // create new user
    () => {
      console.log('save user', req.body.profile.email);
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
