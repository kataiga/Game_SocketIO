const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')
const mailing = require('../controllers/mailing')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/update', authMiddleware, authController.update)
router.post('/delete', authMiddleware, authController.delete)
router.get('/confirm-mail', mailing.checkEmailConfirm)
router.post('/recover-password', authController.recoverPassword)
router.post('/ask-recover-password', mailing.sendRecoverPassword)

module.exports = router