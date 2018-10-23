const expressPromiseRouter = require('express-promise-router')
const models = require('./models.js')

class Api {
  constructor(resource) {
    this.router = expressPromiseRouter()
  }

  get() {}
  post() {}
  patch() {}
  delete() {}
}

module.exports = CampaignApi
