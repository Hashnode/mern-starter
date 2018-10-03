import Happiness from '../models/happiness';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';






/**
 * Save a happiness
 * @param req
 * @param res
 * @returns void
 */
export function addHappiness(req, res) {
  if (!req.body.happiness.individualhappiness||req.body.happiness.teamhappiness) {
    res.status(403).end();
  }

  const newHappiness = new Happiness(req.body.happiness);

  // Let's sanitize inputs
  newHappiness.individualhappiness = sanitizeHtml(newHappiness.individualhappiness);
  newHappiness.teamhappiness = sanitizeHtml(newhappiness.teamhappiness);
//session id still needs to be done

  newHappiness.cuid = cuid();
  newHappiness.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ happiness: saved });
  });
}