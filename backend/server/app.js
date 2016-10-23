'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


const express = require('express'), 
  mongoose = require('mongoose'),
  config = require('./config/environment'),
  cors = require('cors')

// Connect to
mongoose.Promise = global.Promise
mongoose.connect(config.mongo.uri, config.mongo.options)

// Populate DB with sample data
if (config.seedDB) { require('./config/seed') }

// Setup server
const app = express()
app.use(cors())
const server = require('http').createServer(app)
require('./config/express')(app)
require('./routes')(app)
// Error handler - has to be last
require('./errorHanding')(app)

// Start server
server.listen(config.port, config.ip, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
})

// Expose app
exports = module.exports = app
