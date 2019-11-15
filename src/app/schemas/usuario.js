const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Telefone = require('./telefone')

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  telefones: {
    type: [Telefone.schema],
    required: true
  },
  token: {
    type: String
  },
  ultimo_login: {
    type: Date,
    required: true
  }
}, { timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' } })

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) next()

  this.senha = await bcrypt.hash(this.senha, 8)
})

UsuarioSchema.methods.checkPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.senha)
}

module.exports = mongoose.model('Usuario', UsuarioSchema)
