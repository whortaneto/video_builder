'use strict';

const mongoose = require('mongoose'),
    shortid = require('shortid'),
    Schema = mongoose.Schema

let AnswerSchema = new Schema({
  _id: String,
  user: {type: String},
  lesson: {type: String},
  question: {type: String, required: true},
  attempts: [{
    attempt: {type: Number, required: true},
    text: {type: String, required: true},
    isCorrect: {type: Boolean, required: true}
  }]
}, {
  collection: 'answers',
  versionKey: false
})

AnswerSchema.pre('save', function(next) {
  if (this.isNew && !this._id) {
    this._id = shortid()
  }
  this.lastModifiedDtm = new Date()
  next()
})

AnswerSchema.pre('update', function(next) {
  this.lastModifiedDtm = new Date()
  next()
})

module.exports = mongoose.model('Answer', AnswerSchema)
