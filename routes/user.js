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

router.get('/users',
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const users = await User.find().sort({ score: -1 });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  })

router.get('/user/:id',
  isLoggedIn(),
  async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })


module.exports = router;