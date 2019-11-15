const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.production'
require('dotenv').config({ path: envPath })
require('./src/libs/api-error')

const app = require('./src/server')

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`[ENV=${process.env.NODE_ENV}]: Servidor Node rodando na porta ${port}`))
