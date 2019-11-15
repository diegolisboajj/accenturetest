const authService = require('../services/auth')

class AuthController {
  async signUp (req, res, next) {
    try {
      const usuario = await authService.signUp(req.body)

      res.status(201).json(usuario)
    } catch (err) {
      next(err)
    }
  }

  async signIn (req, res, next) {
    try {
      const usuario = await authService.signIn(req.body)

      res.json(usuario)
    } catch (err) {
      if (err instanceof APIError) {
        return res.status(401).json({ mensagem: err.message })
      }

      next(err)
    }
  }
}

module.exports = new AuthController()
