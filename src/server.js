const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')

const dbConfig = require('./config/database')
const router = require('./routes')

class App {
  constructor () {
    this.isDev = process.env.NODE_ENV !== 'production'

    this.server = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  async database () {
    await mongoose.connect(dbConfig.mongo.uri, dbConfig.mongo.options)
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(morgan('combined'))
    this.server.use(helmet())
    this.server.use(cors())
  }

  routes () {
    this.server.use('/api', router)
    this.server.use((req, res) => res.status(404).json({ mensagem: 'Recurso não encontrado' }))
  }
}

module.exports = new App().server
