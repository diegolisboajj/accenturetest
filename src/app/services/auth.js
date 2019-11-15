const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')

const usuarioRepository = require('../repositories/usuario')

class AuthService {
  generateJwt (usuarioId) {
    return jwt.sign(usuarioId, jwtConfig.secret)
  }

  validateJwt (token) {
    return jwt.verify(token, jwtConfig.secret)
  }

  async signUp ({ nome, email, senha, telefones }) {
    await usuarioRepository.store({
      nome,
      email,
      senha,
      telefones,
      ultimo_login: new Date()
    })

    return this.signIn({ email, senha })
  }

  async signIn ({ email, senha }) {
    const usuario = await usuarioRepository.findByEmail(email)

    if (!usuario) {
      throw new APIError('Usuário ou senha inválidos')
    }

    if (!await usuario.checkPassword(senha)) {
      throw new APIError('Usuário ou senha inválidos')
    }

    usuario.ultimo_login = new Date()
    usuario.token = this.generateJwt(usuario.id)

    return usuarioRepository.update(usuario)
  }

  async isInvalidSession (userId, token, tempoSessao = (30 * 60 * 1000)) {
    const usuario = await usuarioRepository.findById(userId)

    if (!usuario || usuario.token !== token) {
      throw new APIError('Não autorizado')
    }

    const validacaoUltimoLogin = +new Date(+new Date() - tempoSessao)
    const usuarioUltimoLogin = +new Date(usuario.ultimo_login)

    return usuarioUltimoLogin < validacaoUltimoLogin
  }
}

module.exports = new AuthService()
