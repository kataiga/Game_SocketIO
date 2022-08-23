const request = require('supertest')
const app = require('../src/app')
const expect = require('chai').expect

describe('GET /users', () => {
    it('GET /user endpoint successfully returns response', () => {
        try {
            return request(app)
                .get('/api/user')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                })
        } catch (err) {
            console.error(err)
        }
    })
})