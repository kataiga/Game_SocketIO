const request = require('supertest')
const app = require('../src/app')
const expect = require('chai').expect

describe('POST /auth/register endpoint', async () => {
    it('POST valid user creds', async () => {
        try {
            return await request(app)
                .post('/auth/register')
                .send({
                    username: 'kataiga',
                    email: 'kataiga@wam.com',
                    password: 'Rikka123'
                })
                .then((res) => {
                    expect(res.statusCode).to.equal(201)
                    expect(res.body)
                        .to.be.an.instanceof(Object)
                        .that.includes.all.keys(['id', 'username', 'email', 'password', 'updatedAt', 'createdAt'])
                })
            } catch (err) {
                console.error(err)
            }
    })
})



describe('POST /auth/login endpoint', async () => {
    it('POST good creds', async () => {
        try {
            return await request(app)
                .post('/auth/login')
                .send({ email: 'kataiga@wam.com', password: 'Rikka123' })
                .then((response) => {
                    expect(response.statusCode).to.equal(200)
                    expect(response.body)
                        .to.be.an.instanceof(Object)
                        .that.includes.keys('token')
                })
        } catch (err) {
            console.error(err)
        }
    })
    it('POST bad creds', async () => {
        try {
            return await request(app)
                .post('/auth/login')
                .send({ email: 'futabawa@wam.com', password: 'joker' })
                .then((response) => {
                    expect(response.statusCode).to.equal(401)
                })
        } catch (err) {
            console.error(err)
        }
    }) 
})