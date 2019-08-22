'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const User = require('../models/User');


const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
  validationSignup
} = require('../helpers/middlewares');

router.put(
  '/score',
  isLoggedIn(),
  async (req, res, next) => {
    const { score, pillId } = req.body;
    console.log(score)
    const _id = req.session.currentUser._id;
    try {
      let user = await User.findById(_id);
      const newScore = user.score + score;
      user = await User.findByIdAndUpdate(_id, { $set: { score: newScore }, $push: { takenPills: { pill: pillId, score: score } } })
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;