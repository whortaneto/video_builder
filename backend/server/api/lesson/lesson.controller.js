'use strict';

const _ = require('lodash'),
  Lesson = require('../../models/lesson.model'),
  errors = require('rest-api-errors')

// Get list of lessons
exports.getAll = (req, resp, next) => {
  Lesson.find().then(lessons => {
    resp.status(200).send(lessons)
  }).catch(next)
}

// Get a single lesson
exports.get = (req, resp, next) => {
  Lesson.findById(req.params.id).then(lesson => {
    if(!lesson) {
      throw new errors.NotFound('lesson_not_found')
    }
    resp.status(200).send(lesson)
  }).catch(next)
}

// Creates a new lesson in the DB.
exports.create = (req, resp, next) => {
  Lesson.create(
      _.merge(req.body, { urlVideo: req.urlVideo }
  )).then(lesson => { 
      resp.status(201).send(lesson)
    }).catch(next)
}

// Updates an existing lesson in the DB.
exports.update = (req, resp) => {
  delete req.body._id
  Lesson.findById(req.params.id).then(lesson => {
    if (!lesson) {
      throw new errors.NotFound('lesson_not_found')
    }
    let updated = _.assing(lesson, req.body)
    updated.save()
  }).then(lesson => {
    resp.status(200).send(lesson)
  }).catch(next)
}

// Deletes a lesson from the DB.
exports.destroy = (req, resp, next) => {
  Lesson.findById(req.params.id).then(lesson => {
    if (!lesson) return
    lesson.remove()
  }).then(() => resp.status(204).end()).catch(next)
}
