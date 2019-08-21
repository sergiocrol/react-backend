'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Pill = require('../models/Pill');
const User = require('../models/User');
const Card = require('../models/Card');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
  validationSignup
} = require('../helpers/middlewares');

router.get(
  '/pill/:id',
  isLoggedIn(),
  async (req, res, next) => {
    const { id } = req.params;
    const _id = id;
    console.log(req.params)
    try {
      const pill = await Pill.findOne({ _id }).populate('author').populate('cards');
      res.status(200).json(pill);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/new',
  isLoggedIn(),
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

router.post(
  '/card/image',
  isLoggedIn(),
  async (req, res, next) => {
    const { type, pillId, images } = req.body;
    try {
      const newCard = await Card.create({ type, pillId, images });
      await Pill.findByIdAndUpdate(pillId, { $push: { cards: newCard._id } })
      res.status(200).json(newCard);
    } catch (error) {
      next(error);
    }
  }
)

router.put(
  '/pill/:id/taken',
  isLoggedIn(),
  async (req, res, next) => {
    const { id } = req.params;
    const _id = id;
    try {
      const pill = await Pill.findByIdAndUpdate(_id, { $inc: { numberTaken: 1 } })
      res.status(200).json(pill);
    } catch (error) {
      next(error);
    }
  }
)

router.put(
  '/pill/:id/rate',
  isLoggedIn(),
  async (req, res, next) => {
    const { id } = req.params;
    const { rate } = req.body;
    const _id = id;
    try {
      const pill = await Pill.findByIdAndUpdate(_id, { $inc: { reviewers: 1, rate: rate } })
      res.status(200).json(pill);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;