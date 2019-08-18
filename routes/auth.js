'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
  validationSignup
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post(
  '/login',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationSignup(),
  async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email }, 'email');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ email, password: hashPass, name });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  delete req.session.currentUser;
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

router.put('/profile', isLoggedIn(), async (req, res, next) => {
  const { name, profileImage, location, age, gender, nativeLanguage, spokenLanguages, learningLanguages } = req.body;
  const newUser = { name, profileImage, location, age, gender, nativeLanguage, spokenLanguages, learningLanguages };
  const id = req.session.currentUser._id;
  try {
    const user = await User.findByIdAndUpdate(id, { $set: newUser });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
