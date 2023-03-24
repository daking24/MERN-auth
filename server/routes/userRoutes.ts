import express from 'express'
import { signinController, signupController } from '../controllers/userController'

const router = express.Router()

router.post('/signin', signinController)
router.post('/signup', signupController)

module.exports = router
