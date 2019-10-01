'use strict';

const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({ error: 'unhautorized' })
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(createError(422));
  } else {
    next();
  }
};

exports.validationSignup = () => (req, res, next) => {
  const { email, password, rePassword, name } = req.body;
  if (!email || !password || !rePassword || !name || password !== rePassword) {
    next(createError(422));
  } else {
    next();
  }
};
