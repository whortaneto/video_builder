'use strict';

const errors = require('rest-api-errors')

module.exports = function(app) {

  app.use('/api/lessons', require('./api/lesson'))
  app.use('/api/answers', require('./api/answer'))
  
  app.use(function(req, resp, next) {
    throw new errors.NotImplemented()
  })
}
