const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  return res.status(200).json({
    title: 'Express Testing',
    message: `The app is working properly!!! ${process.env.NODE_ENV}`,
  })
})

module.exports = router
