'use strict';

const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
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
  console.log(req.body)
  if (!email || !password) {
    next(createError(422));
  } else {
    next();
  }
};

exports.validationSignup = () => (req, res, next) => {
  const { email, password, rePassword, name } = req.body;
  console.log("res: " + password !== rePassword)
  if (!email || !password || !rePassword || !name || password !== rePassword) {
    next(createError(422));
  } else {
    next();
  }
};
