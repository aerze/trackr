const expressPromiseRouter = require('express-promise-router')

class Resource {
  static createRouterFromModel(model) {
    const resource = new Resource(model)
    return Resource.createRouter(resource)
  }
  /**
   * @param {Resource} resource
   */
  static createRouter(resource) {
    const router = expressPromiseRouter()
    router.get('/', resource.list)
    router.post('/', resource.create)
    router.get('/:id', resource.get)
    router.post('/:id', resource.update)
    router.delete('/:id', resource.delete)
    return router
  }

  constructor(model) {
    this.model = model
    this.list = this.list.bind(this)
    this.create = this.create.bind(this)
    this.get = this.get.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  format(entity) {
    return { [this.model.type]: entity }
  }

  async list(req, res) {
    const list = await this.model.get()
    return res.json(this.format(list))
  }

  async create(req, res) {
    const { body } = req
    const entity = await this.model.create(body)
    return res.json(this.format(entity))
  }

  async get(req, res) {
    const { id } = req.query
    const entity = await this.model.get(id)
    return res.json(this.format(entity))
  }

  async update(req, res) {
    const {
      body,
      query: { id }
    } = req
    const entity = await this.model.update(id, body)
    return res.json(this.format(entity))
  }

  async delete(req, res) {
    const { id } = req.query
    const entity = await this.model.delete(id)
    return res.json(this.format(entity))
  }
}

module.exports = Resource
