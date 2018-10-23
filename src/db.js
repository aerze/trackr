const Datastore = require('nedb')

const db = new Datastore({
  filename: './trackr.nedb',
  autoload: true
})

module.exports = db
