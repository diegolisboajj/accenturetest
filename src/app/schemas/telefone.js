const { Schema, model } = require('mongoose')

const TelefoneSchema = new Schema({
  numero: {
    type: String,
    required: true
  },
  ddd: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2
  }
})

module.exports = model('Telefone', TelefoneSchema)
