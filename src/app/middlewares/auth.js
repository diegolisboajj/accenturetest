const authService = require('../services/auth')

module.exports = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    let errorMessage = 'Não autorizado'

    if (!authToken) {
      throw new Error(errorMessage)
    }

    const parts = authToken.split(' ')

    if (parts.length !== 2) {
      throw new Error(errorMessage)
    }

    const [scheme, token] = parts

    if (!/^Bearer$/.test(scheme)) {
      throw new Error(errorMessage)
    }

    const usuarioId = authService.validateJwt(token)

    const isSessaoInvalida = await authService.isInvalidSession(usuarioId, token)

    if (isSessaoInvalida) {
      errorMessage = 'Sessão inválida'
      throw new Error(errorMessage)
    }

    req.usuarioId = usuarioId
    next()
  } catch (err) {
    res.status(401).json({ mensagem: err.message })
  }
}
