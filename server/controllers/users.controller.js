
import React from 'react';
import { renderToString } from 'react-dom/server';
import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import cuid from 'cuid';

/* public */
export function checkAdmin(req, res) {
  const password = req.body.password;
  if (password !== '1') {
    res.send({ success: false });
  } else {
    res.send({ success: true });
  }
}

export function userList(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.send({
        success: false, code: 0, message: err
      });
    } else {
      res.send({
        success: true, code: 1, message: users
      });
    }
  });
}

export function addUser(req, res) {
  if (!req.body.name) {
    res.send({
      success: false,
      code: 0,
      message: 'please input user name'
    });
    return;
  }

  const newUser = new User(req.body);
  newUser.id = cuid();
  newUser.name = sanitizeHtml(newUser.name);
  newUser.phone = sanitizeHtml(newUser.phone);
  newUser.email = sanitizeHtml(newUser.email);

  newUser.save((err) => {
    if (err) {
      res.send({
        success: false, code: 0, message: err
      });
    } else {
      res.send({
        success: true, code: 1, message: 'user added'
      });
    }
  });
}


export function editUser(req, res) {

  if (!req.body.name) {
    res.send({
      success: false,
      code: 0,
      message: 'please input user name'
    });
    return;
  }

  User.findOne({ id: req.body.id }).exec((err, user) => {
    if (err) {
      res.send({ success: false, code: 0, message: err });
    }

    user.update({ name: req.body.name, phone: req.body.phone, email: req.body.email }, () => {
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



