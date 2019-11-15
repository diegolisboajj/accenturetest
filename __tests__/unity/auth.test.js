require('dotenv').config({ path: '.env.test' })
require('../../src/libs/api-error')
require('../../src/server')
const mongoose = require('mongoose')
const usuarioRepository = require('../../src/app/repositories/usuario')
const authService = require('../../src/app/services/auth')

const dadosUsuarioTeste = {
	"nome": "Diego Lisboa",
	"email": "diego.giglioli@gmail.com",
	"senha": "abc123456",
	"telefones": [
		{
			"numero": "11223344",
			"ddd": "11"
		}
	]
}

describe('[Service] Auth', () => {
  test('Teste para sessão inválida', async () => {
    /**
     * Arrange
     */
    const ultimo_login = new Date(+new Date() - (30 * 60 * 1000))
    let usuarioTeste = await usuarioRepository.store({
      ...dadosUsuarioTeste,
      ultimo_login
    })
    usuarioTeste.token = authService.generateJwt(usuarioTeste.id)
    usuarioTeste = await usuarioRepository.update(usuarioTeste)

    /**
     * Act
     */
    const isInvalidSession = await authService.isInvalidSession(usuarioTeste.id, usuarioTeste.token)

    /**
     * Assert
     */
    expect(isInvalidSession).toBe(true)
    return usuarioTeste.remove()
  })

  test('Teste da lógica de cadastro', async () => {
    /**
     * Arrange
     */
    dadosUsuarioTeste.telefones.push({
      numero: '77885544',
      ddd: '11'
    })

    /**
     * Act
     */
    const usuarioLogado = await authService
      .signUp({ ...dadosUsuarioTeste })

    expect(usuarioLogado.id).not.toBeFalsy()
    expect(usuarioLogado.token).not.toBeFalsy()
    expect(usuarioLogado.telefones.length).toBe(2)
    await usuarioLogado.remove()
  })

  test('Teste para login', async () => {
    /**
     * Arrange
     */
    const ultimo_login = new Date(+new Date() - (30 * 60 * 1000))
    let usuarioTeste = await usuarioRepository.store({
      ...dadosUsuarioTeste,
      ultimo_login
    })
    usuarioTeste.token = authService.generateJwt(usuarioTeste.id)
    usuarioTeste = await usuarioRepository.update(usuarioTeste)

    /**
     * Act
     */
    const usuarioLogado = await authService
      .signIn({ email: dadosUsuarioTeste.email, senha: dadosUsuarioTeste.senha })

    expect(usuarioLogado.id).not.toBeFalsy()
    await usuarioLogado.remove()
  })
})

afterAll( async () => {
  await mongoose.connection.close()
})
