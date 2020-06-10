'use strict'

const { config } = require('fvi-node-utils')

module.exports = config({
    mailer: {
        transport: {
            host: {
                doc: 'FVI Mailer Transport Host',
                format: 'url',
                default: 'smtp.ethereal.email',
                env: 'INTELLIGIR_MAILER_URL',
                arg: 'fvi-mailer-url',
            },
            port: {
                doc: 'FVI Mailer Transport Port',
                format: Number,
                default: 587,
                env: 'INTELLIGIR_MAILER_PORT',
                arg: 'fvi-mailer-port',
            },
            secure: {
                doc: 'FVI Mailer Transport Secure',
                format: Boolean,
                default: false,
                env: 'INTELLIGIR_MAILER_SECURE',
                arg: 'fvi-mailer-secure',
            },
            username: {
                doc: 'Intellligir Mailer Transport Username',
                format: String,
                default: '',
                env: 'INTELLIGIR_MAILER_USER',
                arg: 'fvi-mailer-user',
            },
            password: {
                doc: 'FVI Mailer Transport Password',
                format: String,
                default: '',
                env: 'INTELLIGIR_MAILER_PASSWD',
                arg: 'fvi-mailer-passwd',
            },
            mock: {
                doc: 'FVI Mailer Transport Mocked',
                format: Boolean,
                default: false,
                env: 'INTELLIGIR_MAILER_MOCKED',
                arg: 'fvi-mailer-mocked',
            },
        },
    },
})
