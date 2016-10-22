'use strict';

var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
    _id: String,
    createdDtm: {type: Date, default: Date.now},
    lastModifiedDtm: Date,
    urlVideo: {type: String, required: true},
      questions: [{
        index: {type: Number, required: true},
        time: {type: Number, required: true},
        question: {type: String, required: true},
        choices: [{
            text: {type: String, required: true},
            isCorrect: {type: Boolean, required: true}
        }]
      }]
}, {
    collection: 'lessons',
    versionKey: false
});

LessonSchema.pre('save', function(next) {
    if (this.isNew && !this._id) {
        this._id = shortid();
    }
    this.lastModifiedDtm = new Date();
    next();
});

LessonSchema.pre('update', function(next) {

    this.lastModifiedDtm = new Date();
    next();
});

module.exports = mongoose.model('Lesson', LessonSchema);
