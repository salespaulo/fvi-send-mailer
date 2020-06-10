'use strict'

const { joi } = require('fvi-node-utils/app/objects')

const schema = joi.object({
    from: joi
        .string()
        .email()
        .required(),
    to: joi
        .string()
        .required(),

    subject: joi.string().required(),
    text: joi.string().required(),
})

module.exports = schema
