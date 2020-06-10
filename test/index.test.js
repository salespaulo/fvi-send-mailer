'use strict'

const chai = require('chai')

const app = require('../app')

describe('Testing', () => {
    let event = null

    beforeEach(() => {
        event = {
            from: 'from@from.com',
            to: 'to@to.com',
            subject: 'subject',
            text: '<html><body><h1>Olá</h1><p>{{testingMustache}}</p></body></html>',
            template: { testingMustache: 'testing mustache text' },
        }
    })

    it('Testing send mailer - Validation - without From', done => {
        delete event.from
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(_res => done('Should be throws validation error!'))
            .catch(_e => done())
    })

    it('Testing send mailer - Validation - invalid From', done => {
        event.from = 'from'
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(_res => done('Should be throws validation error!'))
            .catch(_e => done())
    })

    it('Testing send mailer - Validation - without To', done => {
        delete event.to
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(_res => done('Should be throws validation error!'))
            .catch(_e => done())
    })

    it('Testing send mailer - Validation - invalid To', done => {
        event.to = 'to'
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(_res => done('Should be throws validation error!'))
            .catch(_e => done())
    })

    it('Testing send mailer - Validation - without Subject', done => {
        delete event.subject
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(_res => done('Should be throws validation error!'))
            .catch(_e => done())
    })

    it('Testing send mailer - Validation - without Text', done => {
        delete event.text
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(_res => done('Should be throws validation error!'))
            .catch(_e => done())
    })

    it('Testing send mailer - Initializate - Mocked transport', done => {
        const instance = app()
        chai.assert.exists(instance.send, 'res.send not exists!')
        chai.assert.exists(instance.mock, 'res.mock not exists!')
        chai.assert.isFunction(instance.send, 'res.mock is not function!')
        chai.assert.isTrue(instance.mock, 'res.mock is not true!')
        done()
    })

    it('Testing send mailer - Initializate - Not mocked transport', done => {
        const instance = app({ transport: { mock: false } })
        chai.assert.exists(instance.send, 'res.send not exists!')
        chai.assert.exists(instance.mock, 'res.mock not exists!')
        chai.assert.isFunction(instance.send, 'res.mock is not function!')
        chai.assert.isFalse(instance.mock, 'res.mock is not false!')
        done()
    })

    it('Testing send mailer - Successfuly - Mocked transport', done => {
        app()
            .send(event.from, event.to, event.subject, event.text, event.template)
            .then(res => {
                chai.assert.exists(res, 'res not exists!')
                chai.assert.exists(res.accepted, 'res.accepted not exists!')
                chai.assert.exists(res.envelopeTime, 'res.envelopeTime not exists!')
                chai.assert.exists(res.messageId, 'res.messageId not exists!')
                chai.assert.exists(res.messageTime, 'res.messageTime not exists!')
                chai.assert.exists(res.messageSize, 'res.messageSize not exists!')
                chai.assert.exists(res.response, 'res.response not exists!')
                chai.assert.exists(res.etherealMessageUrl, 'res.etherealMessageUrl not exists!')
                done()
            })
            .catch(done)
    })
})
