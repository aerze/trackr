const Model = require('./Model.js')

class Campaigns extends Model {
  constructor() {
    super('campaigns', {
      name: {
        presence: { allowEmpty: false }
      }
    })
  }
}

module.exports = new Campaigns()
