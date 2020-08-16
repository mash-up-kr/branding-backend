const router = require('express').Router()
const auth = require('./auth_controller.js')

router.post('/sign-in', auth.signIn);

module.exports = router
