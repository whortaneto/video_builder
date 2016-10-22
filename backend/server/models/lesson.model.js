'use strict';

var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
    _id: String,
    createdDtm: {type: Date, default: Date.now},
    createdBy: String,
    lastModifiedDtm: Date,
    lastModifiedBy: Date,
    urlVideo: String
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
