const { Router } = require('express')

const router = Router()

/**
 * Middlewares
 */
const authMiddleware = require('./app/middlewares/auth')
const errorMiddleware = require('./app/middlewares/error')

/**
 * Validators
 */
const authValidator = require('./app/validators/auth')

/**
 * Controllers
 */
const authController = require('./app/controllers/auth')
const usuarioController = require('./app/controllers/usuario')

router.post('/auth/sign_up', authValidator.signUpSchema(), authController.signUp)
router.post('/auth/sign_in', authValidator.signInSchema(), authController.signIn)

router.use(authMiddleware)

router.get('/usuarios/:id', usuarioController.findOne)

router.use(errorMiddleware)

module.exports = router
