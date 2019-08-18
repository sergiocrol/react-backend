'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Pill = require('../models/Pill');
const User = require('../models/User');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
  validationSignup
} = require('../helpers/middlewares');

router.get(
  '/pill/:id',
  //isLoggedIn(),
  async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params)
    try {
      const pill = await Pill.findById(id);
      res.status(200).json(pill);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/new',
  //isLoggedIn(),
  async (req, res, next) => {
    const { name, fromLanguage, toLanguage, author, date, difficulty, description, topics } = req.body;
    try {
      const newPill = await Pill.create({ name, fromLanguage, toLanguage, author, date, difficulty, description, topics });
      const updateUser = await User.findByIdAndUpdate(author, { $push: { createdPills: newPill._id } })
      res.status(200).json(newPill);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;