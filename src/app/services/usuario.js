const usuarioRepository = require('../repositories/usuario')

class UsuarioService {
  async findById (id) {
    const usuario = await usuarioRepository.findById(id)

    if (!usuario) {
      throw new APIError('Usuário não encontrado')
    }

    return usuario
  }
}

module.exports = new UsuarioService()
