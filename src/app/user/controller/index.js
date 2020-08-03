const router = require('express').Router()
const auth = require('./auth.controller')

router.post('/sign-in', auth.signIn);

module.exports = router
