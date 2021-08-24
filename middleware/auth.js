const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  if(!req.headers.cookie){res.status(400).send('Invalid token.');}
  const token = req.headers.cookie.split('; ')[0].split('=')[1];
  if (!token) return res.status(401).send('Access denied. Login to get access.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}