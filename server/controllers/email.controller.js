import Email from '../models/email';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

// ADDPOST function
export function addPost(req, res) {
  // Make sure a recipient, subject, and body are entered
  if (!req.body.form.to || !req.body.form.title || !req.body.form.body) {
    res.status(403).end();
  }

  // Make sure recipient email is valid, if not respond with 400 status
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.form.to))) {
    res.status(400).json({ error: true, message: 'Invalid recipient address' });
    return;
  }

  // Initialize and send email through sendgrid
  const sgMail = require('../../node_modules/@sendgrid/mail');
  sgMail.setApiKey('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');
  const msg = {
    to: req.body.form.to,
    from: 'benbrengman@icloud.com',
    subject: req.body.form.title,
    text: req.body.form.body,
  };
  sgMail
  .send(msg)
  .catch(error => { res.status(400).send(error); });

  // Initialize new email form
  const newForm = new Email(req.body.form);

  // Sanitize inputs
  newForm.to = sanitizeHtml(newForm.to);
  newForm.title = sanitizeHtml(newForm.title);
  newForm.body = sanitizeHtml(newForm.body);

  newForm.cuid = cuid();
  newForm.save((err, saved) => {
    // If error sending email for whatever reason, respond with 500 status
    if (err) {
      res.status(500).send(err);
      res.json({ form: saved, error: false, message: 'ERROR sending email' });
    }
    // If no error, respond with 200 status
    res.json({ form: saved, error: false, message: 'Email sent!' });
    res.status(200).end();
  });
}// addPost
