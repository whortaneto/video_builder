'use strict';

const express = require('express'), 
  controller = require('./lesson.controller'), 
  router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
