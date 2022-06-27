const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    // console.log('req', req);
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];

    if (!cookie) {
      throw new Error('Please sign in to continue');
    }
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
