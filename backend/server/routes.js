/**
 * Main application routes
 */

'use strict';

var errors = require('rest-api-errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/lessons', require('./api/lesson'));
  

  // All other routes should return not implemented
  app.use(function(req, resp, next) {

    throw new errors.NotImplemented();
  });
};
