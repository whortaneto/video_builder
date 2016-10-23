'use strict';

const express = require('express'),
  controller = require('./answer.controller'),
  router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.get('/byLesson/:id', controller.getByLesson)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
