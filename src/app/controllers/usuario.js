const usuarioService = require('../services/usuario')

class UsuarioController {
  async findOne (req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        throw new APIError('Parâmetro inválido')
      }

      const usuario = await usuarioService.findById(id)

      res.json(usuario)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UsuarioController()
