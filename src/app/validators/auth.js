const { checkSchema } = require('express-validator')
const handleValidatorMiddleware = require('../middlewares/handle-validator')

class AuthValidator {
  signUpSchema () {
    const validation = checkSchema({
      nome: {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'Nome é obrigatório'
        },
        isString: {
          errorMessage: 'Nome inválido'
        }
      },
      email: {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'E-mail é obrigatório'
        },
        isString: {
          errorMessage: 'E-mail inválido'
        },
        isEmail: {
          errorMessage: 'E-mail inválido'
        }
      },
      senha: {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'Senha é obrigatória'
        },
        isString: {
          errorMessage: 'Senha inválida'
        },
        isLength: {
          errorMessage: 'Senha deve conter no mínimo 4 caracteres',
          options: { min: 4 }
        }
      },
      'telefones.*.numero': {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'Número de telefone obrigatório'
        },
        isString: {
          errorMessage: 'Número de telefone inválido'
        }
      },
      'telefones.*.ddd': {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'DDD obrigatório'
        },
        isString: {
          errorMessage: 'DDD inválido'
        },
        isLength: {
          errorMessage: 'DDD deve conter 2 caracteres',
          options: { min: 2, max: 2 }
        }
      }
    })

    return [validation, handleValidatorMiddleware]
  }

  signInSchema () {
    const validation = checkSchema({
      email: {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'E-mail é obrigatório'
        },
        isString: {
          errorMessage: 'E-mail inválido'
        },
        isEmail: {
          errorMessage: 'E-mail inválido'
        }
      },
      senha: {
        in: 'body',
        trim: true,
        exists: {
          errorMessage: 'Senha é obrigatória'
        },
        isString: {
          errorMessage: 'Senha inválida'
        },
        isLength: {
          errorMessage: 'Senha deve conter no mínimo 4 caracteres',
          options: { min: 4 }
        }
      }
    })

    return [validation, handleValidatorMiddleware]
  }
}

module.exports = new AuthValidator()
