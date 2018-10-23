const Datastore = require('nedb')

class Database {
  constructor(type) {
    this.db = new Datastore({
      filename: `./${type}.nedb`,
      autoload: true
    })
  }

  async findOne(query) {
    return new Promise((resolve, reject) => {
      this.db.findOne(query, (error, docs) => {
        if (error) return reject(error)
        return resolve(docs)
      })
    })
  }

  async find(query) {
    return new Promise((resolve, reject) => {
      this.db.find(query, (error, docs) => {
        if (error) return reject(error)
        return resolve(docs)
      })
    })
  }

  async insert(document) {
    return new Promise((resolve, reject) => {
      this.db.insert(document, (error, document) => {
        if (error) return reject(error)
        return resolve(document)
      })
    })
  }

  async update(query, update, options) {
    return new Promise((resolve, reject) => {
      this.db.update(query, update, options, (error, numAffected) => {
        if (error) return reject(error)
        return resolve(numAffected)
      })
    })
  }

  async remove(query) {
    return new Promise((resolve, reject) => {
      this.db.remove(query, (error, numRemoved) => {
        if (error) return reject(error)
        return resolve(numRemoved)
      })
    })
  }
}

module.exports = Database
