const express = require('express')
const bodyParser = require('body-parser')

const Resource = require('./Resource.js')
const Campaigns = require('./Campaigns.js')

const redirect = require('./redirect.js')
// const { Campaign } = require('./models.js')
// const Api = require('./api')

const port = process.env.PORT || 8080

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/track', redirect)

app.use('/api/campaign', Resource.createRouterFromModel(Campaigns))
// app.use('/api/campaign', Api(Campaign))

// app.post('/api/campaign', (req, res) => {
//   const body = req.body

//   const campaign = new Campaign(body)

//   campaign
//     .save()
//     .then(data => {
//       res.json({ status: 'ok', data })
//     })
//     .catch(error => {
//       res.json({ status: 'not ok', error: error.toString(), stack: error.stack })
//     })
// })

app.use('*', (req, res) => {
  res.send('test')
})

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err.status) {
    const { status, name, message, stack, validation } = err
    res.status(status)

    if (status === 400) {
      return res.json({ name, message, validation })
    }

    return res.json({ name, message, status, stack })
  }

  return next(err)
})

app.listen(port)
