const { Types } = require('mongoose')
const Usuario = require('../schemas/usuario')

class UsuarioRepository {
  store (usuario) {
    return Usuario.create({ ...usuario })
  }

  update (usuario) {
    return Usuario.findByIdAndUpdate(usuario.id, usuario, { new: true })
  }

  findById (id) {
    if (!Types.ObjectId.isValid(id)) {
      throw new APIError('Operação inválida')
    }

    return Usuario.findById(id)
  }

  findByEmail (email) {
    return Usuario.findOne({ email }).select('+senha')
  }
}

module.exports = new UsuarioRepository()
