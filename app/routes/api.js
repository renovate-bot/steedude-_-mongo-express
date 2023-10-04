const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../utils/verifyJWT')
const User = require('../models/user')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

function getUserInfo(user) {
  return {
    username: user.username,
    updated: user.updated,
  }
}
//----註冊-----
router.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body
  //防呆
  if (!username || !password || !confirmPassword) {
    return res.status(422).json({ resultCode: 1001 })
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ resultCode: 1002 })
  }
  try {
    //確認有無重複帳號
    const searchResult = await User.findOne({ username: username })
    if (searchResult != null) {
      return res.status(409).json({ resultCode: 1003 })
    }
    //新增帳號
    const doc = {
      username: username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    }
    await User.create(doc)
    return res.status(200).json({
      resultCode: 200,
    })
  } catch (err) {
    return res.status(400).json({ resultCode: 1000, message: err })
  }
})

//-----登入-----
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  //防呆
  if (!username || !password) {
    return res.status(422).json({ resultCode: 1001 })
  }
  try {
    const searchResult = await User.findOne({ username: username })
    //帳號或密碼錯誤
    if (
      searchResult == null ||
      !bcrypt.compareSync(password, searchResult.password)
    ) {
      return res.status(401).json({ resultCode: 1004 })
    }
    return res.json({
      resultCode: 200,
      resultMap: {
        token: jwt.sign({ id: searchResult._id }, process.env.JWT_SECRET, {
          expiresIn: '30m',
        }),
        user: getUserInfo(searchResult),
      },
    })
  } catch (err) {
    return res.status(400).json({ resultCode: 1000, message: err })
  }
})

router.post('/logout', async (req, res) => {
  return res.json({
    resultCode: 200,
  })
})
//-----測試拿資料-----
router.get('/test', verifyJWT, async (req, res) => {
  return res.status(200).json({
    resultCode: 200,
    resultMap: {
      data: [1, 2, 3, 4],
    },
  })
})
module.exports = router
