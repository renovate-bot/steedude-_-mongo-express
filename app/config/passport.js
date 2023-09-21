const passport = require('passport')
// const passportLocal = require('passport-local')
const passportJWT = require('passport-jwt')
// const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// const LocalStrategy = passportLocal.Strategy
const { Strategy: JwtStrategy, ExtractJwt } = passportJWT

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  'token',
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const searchResult = await User.findById(jwt_payload.id)
      if (!searchResult) {
        done(null, false, { message: 'This account is not registered' })
      }
      done(null, searchResult)
    } catch (e) {
      done(e)
    }
  })
)

//以下session: false時用不到
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
