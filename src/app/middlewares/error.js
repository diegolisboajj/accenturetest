module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  if (err instanceof APIError) {
    return res.status(403).json({ mensagem: err.message })
  }

  return res.status(500).json({ mensagem: 'Erro inesperado. Por favor tente novamente' })
}
