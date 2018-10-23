const expressPromiseRouter = require('express-promise-router')

function createRouter(resource) {
  const router = expressPromiseRouter()
  router.get(resource.list)
  router.post(resource.create)
  router.get('/:id', resource.get)
  router.post('/:id', resource.update)
  router.delete('/:id', resource.delete)
  return router
}

module.exports = createRouter
