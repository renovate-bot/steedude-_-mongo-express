const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')

async function verifyJWT(req, res, next) {
  try {
    const bearer = req.headers.authorization.split(' ')
    const bearerToken = bearer[1]
    if (!bearerToken) {
      return res.status(401).json({ resultCode: 1005 })
    }
    const decoded = await jsonwebtoken.verify(
      bearerToken,
      process.env.JWT_SECRET
    )
    const searchResult = await User.findById(decoded.id)
    if (!searchResult) {
      return res.status(404).json({ resultCode: 1006 })
    }
    req.user = searchResult
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ resultCode: 1007 })
    } else {
      return res.status(401).json({ resultCode: 1008 })
    }
  }
}

module.exports = verifyJWT
