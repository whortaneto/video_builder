'use strict';

const _ = require('lodash'),
  Answer = require('../../models/answer.model'),
  errors = require('rest-api-errors')

// Get list of answers by lesson
exports.getAll = (req, resp, next) => {
    Answer.find().then(answers => {
    resp.status(200).send(answers)
  }).catch(next)
}

// Get list of answers by lesson
exports.getByLesson = (req, resp, next) => {
  Answer.find({'lesson': req.params.id}, undefined, function(err, someValue){
    if(err) return next(err);
      resp.status(200).send(someValue);
  });
}

// Get a single answer
exports.get = (req, resp, next) => {
    Answer.findById(req.params.id).then(answer => {
    if(!lesson) {
      throw new errors.NotFound('answer_not_found')
    }
    resp.status(200).send(answer)
  }).catch(next)
}

// Creates a new answer in the DB.
exports.create = (req, resp, next) => {
    Answer.create(
      _.merge(req.body, {  }
  )).then(answer => {
      resp.status(201).send(answer)
    }).catch(next)
}

// Updates an existing answer in the DB.
exports.update = (req, resp, next) => {
  delete req.body._id
    Answer.findById(req.params.id).then(answer => {
    if (!answer) {
      throw new errors.NotFound('answer_not_found')
    }
    let updated = _.assign(lesson, req.body)
    updated.save()
  }).then(answer => {
    resp.status(200).send(answer)
  }).catch(next)
}

// Deletes a answer from the DB.
exports.destroy = (req, resp, next) => {
  Lesson.findById(req.params.id).then(answer => {
    if (!answer) return
    answer.remove()
  }).then(() => resp.status(204).end()).catch(next)
}
