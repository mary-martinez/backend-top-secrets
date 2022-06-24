const { Router } = require('express');
const { UserService } = require('../services/UserService');

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newUser = await UserService.create(req.body);
      res.json(newUser);
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const token = await UserService.signIn(req.body);
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS
      })
        .json({ message: 'Signed in successfully!' });
    } catch (e) {
      next(e);
    }
  });
