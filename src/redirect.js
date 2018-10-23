const db = require('./db.js')

function track(req, res) {
  const { r } = req.query
  res.json(r)
}

module.exports = track
