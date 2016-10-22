'use strict';

var _ = require('lodash');
var Lesson = require('../../models/lesson.model');
var errors = require('rest-api-errors');

// Get list of lessons
exports.getAll = function(req, resp, next) {
  Lesson.find().then(lessons => {
    resp.status(200).send(lessons);
  }).catch(next);
};

// Get a single lesson
exports.get = function(req, resp, next) {
    Lesson.findById(req.params.id).then(lesson => {

        if(!lesson) {
            throw new errors.NotFound('lesson_not_found')
        }

        resp.status(200).send(lesson);
  }).catch(next);
};

// Creates a new lesson in the DB.
exports.create = function(req, resp, next) {
    Lesson.create(_.merge(req.body, {        
        urlVideo: req.urlVideo
    })).then(lesson => {
        resp.status(201).send(lesson);
    }).catch(next);
};

// Updates an existing lesson in the DB.
exports.update = function(req, resp) {

    delete req.body._id;
    body.lastModifiedBy = req.user.username;
    Lesson.findById(req.params.id).then(lesson => {

        if(!lesson) {
            throw new errors.NotFound('lesson_not_found')
        }
        var updated = _.merge(lesson, req.body);
        updated.save()
    }).then(lesson => {
        resp.status(200).send(lesson);
    }).catch(next);
};

// Deletes a lesson from the DB.
exports.destroy = function(req, resp, next) {
    Lesson.findById(req.params.id).then(lesson => {
        if(!lesson) {
            return;
        }
        lesson.remove();
    }).then(() => resp.status(204).end()).catch(next);
};
