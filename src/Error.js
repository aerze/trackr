module.exports = function(status = 500, name = 'Error name missing', extra = {}) {
  const error = new Error(name)
  error.status = status
  Object.entries(extra).forEach(([key, value]) => {
    error[key] = value
  })
  return error
}
