'use strict'

var Joi = require('joi')

var optionsSchema = Joi.object().keys({
  outputDir: Joi.string().default('/docs').allow(''),
  files: Joi.array()
})

var specSchema = Joi.object().keys({
  options: optionsSchema
}).unknown(true)

exports.validate = (spec) => {
  return Joi.attempt(spec, specSchema, 'Invalid spec options')
}
