const short = require('shortid')
const validate = require('validate.js')
const Database = require('./Database')
const Error = require('./Error')

class Model {
  /**
   * @param {string} type
   * @param {object} rules
   */
  constructor(type, rules) {
    this.type = type
    this.rules = rules
    this.keys = Object.keys(rules)

    this.db = new Database(type)
  }

  async get(id = null) {
    if (id && typeof id === 'string') {
      const entity = await this.db.findOne({ _id: id })
      return entity
    } else {
      const entites = await this.db.find({})
      return entites
    }
  }

  async create(body) {
    if (!body) throw new Error(400, 'Create failed, missing body')
    await this.validate(body)
    const document = await this.build(body)
    const entity = await this.db.insert(document)
    return entity
  }

  async update(id, body) {
    if (!id) throw new Error(400, 'Update failed, missing id')
    if (!body) throw new Error(400, 'Update failed, missing data')
    const query = { _id: id }
    const document = await this.db.findOne(query)
    if (!document) throw new Error(404, `Entity with id ${id} does not exist`)

    const update = { ...document, body }
    await this.validate(update)
    await this.db.update(query, update)

    return update
  }

  async delete(id) {
    if (!id) throw new Error(400, 'Delete failed, missing id')
    const entity = await this.get(id)
    await this.db.delete({ _id: id })
    return entity
  }

  async build(data) {
    const { type } = this

    if (!data) throw new Error(400, 'Save failed, missing data')
    if (!type) throw new Error(400, 'Save failed, missing type')

    return {
      ...data,
      type,
      _id: short.generate()
    }
  }

  async validate(body) {
    const validation = validate(body, this.rules)
    if (validation) {
      throw new Error(400, 'Validation Failed', { validation })
    }
  }
}

module.exports = Model
