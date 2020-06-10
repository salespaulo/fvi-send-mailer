'use strict'

const nodemailer = require('nodemailer')
const Mustache = require('mustache')

const { debug, objects } = require('fvi-node-utils')

const schema = require('./schema')

const createTransport = async cfg => {
    let params = {}

    if (cfg.transport.mock) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount()

        params = {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        }
    } else {
        params = {
            pool: true,
            host: cfg.transport.host,
            port: cfg.transport.port,
            secure: cfg.transport.secure,
            auth: {
                user: cfg.transport.username,
                pass: cfg.transport.password,
            },
            tls: {
                rejectUnauthorized: false,
            },
        }
    }

    debug.here(`[Mailer Create Transporte]: params: ${objects.inspect(params)}`)
    const transporter = nodemailer.createTransport(params)

    transporter.verify((err, success) => {
        debug.here(
            `[Mailer Transport]: Verify: error: ${objects.inspect(err)}; success: ${objects.inspect(
                success
            )}`
        )
    })

    return transporter
}

const send = cfg => async (from, to, subject, text, template = {}) => {
    const { value, error } = schema.validate({ from, to, subject, text })

    if (error) {
        throw new Error(`Invalid input schema error=${objects.inspect(error)}!`)
    }

    const html = Mustache.render(value.text, template)

    // send mail with defined transport object
    const transporter = await createTransport(cfg)

    const info = await transporter.sendMail({
        ...value,
        html: html,
    })

    if (cfg.transport.mock) {
        info.etherealMessageUrl = nodemailer.getTestMessageUrl(info)
    }

    debug.here(`[Mailer Send]: Message: ${objects.inspect(info)}`)

    return info
}

const getConfig = (cfg = null) => {
    if (cfg == null) {
        const config = require('./config')
        const mailerCfg = config.get('mailer')

        return mailerCfg
    }

    return cfg
}

module.exports = (config = null) => {
    const cfg = getConfig(config)
    debug.here(`[Mailer Send]: Config: ${objects.inspect(cfg)}`)

    return {
        send: send(cfg),
        mock: cfg.transport.mock,
    }
}
