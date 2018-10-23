const short = require('shortid')
const db = require('./db.js')

class Resource {
  static all() {}
  static find() {}
  static findOne() {}
  static update() {}
  static count() {}

  save() {
    const { data, type } = this
    return new Promise((resolve, reject) => {
      if (!data) return reject(new Error('Save failed, missing data'))
      if (!type) return reject(new Error('Save failed, missing type'))

      const sid = short.generate()
      const document = { ...data, type, _id: sid }

      db.insert(document, (err, doc) => {
        if (err) return reject(err)
        return resolve(doc)
      })
    })
  }
}

class Campaign extends Resource {
  /**
   * @param {object} data
   * @param {string} data.name
   */
  constructor(data) {
    super()
    this.type = 'Campaign'
    this.data = data
  }
}

class Rotation extends Resource {
  /**
   * @param {object} data
   * @param {string} data.name
   * @param {string} data.campaignId
   */
  constructor({ name, campaignId }) {
    super()
    this.type = 'Rotation'
    this.data = { name, campaignId }
  }
}

class LandingPage extends Resource {
  /**
   * @param {object} data
   * @param {string} data.name
   * @param {string} data.url
   */
  constructor({ name, url }) {
    super()
    this.type = 'LandingPage'
    this.data = { name, url }
  }
}

class Offer extends Resource {
  /**
   * @param {object} data
   * @param {string} data.name
   * @param {number} data.value
   */
  constructor({ name, value }) {
    super()
    this.type = 'Offer'
    this.data = { name, value }
  }
}

class Impression extends Resource {
  /**
   * @param {object} data
   * @param {string} data.campaignId
   * @param {string} data.rotationId
   * @param {string} data.landingPageId
   * @param {string} data.offerId
   */
  constructor({ campaignId, rotationId, landingPageId, offerId }) {
    super()
    this.type = 'Impression'
    this.data = { campaignId, rotationId, landingPageId, offerId }
  }
}

module.exports = {
  Campaign,
  Rotation,
  LandingPage,
  Offer,
  Impression
}
