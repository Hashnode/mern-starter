import Happiness from '../models/happiness';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import User from '../models/user';
import timedTask from '../util/timedNotificaionTask';


/**
 * Save a happiness
 * @param req
 * @param res
 * @returns void
 */
export function addHappiness(req, res) {
  if (!req.body.happiness.individualhappiness || !req.body.happiness.teamhappiness) {
    res.status(403).end();
  }

  const sid = req.body.sid ? req.body.sid : 'cjmah9iu8000146gz0tbav7ki';
  User.findOne({ id: sid }).exec((error, user) => {
    if (error) {
      res.status(403).end();
    } else {
      const newHappiness = new Happiness(req.body.happiness);
      // Let's sanitize inputs
      newHappiness.individualhappiness = sanitizeHtml(newHappiness.individualhappiness);
      newHappiness.teamhappiness = sanitizeHtml(newHappiness.teamhappiness);
      newHappiness.teamid = user.team;
      newHappiness.cuid = cuid();
      newHappiness.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        timedTask.clearNotificationOfUser(sid);
        res.json({ happiness: saved });
      });
    }
  });
}
