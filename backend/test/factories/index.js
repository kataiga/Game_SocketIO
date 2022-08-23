
const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
const factory = factoryGirl.factory
factory.setAdapter(adapter)

factory.cleanUp()

const db = require('../../src/models')

factory.define('User', db.User, async () => {
  const attrs = {
    id: '1',
    username: 'futaba',
    email: 'futaba@wam.com',
    password: 'joker'
    
  }
  return attrs
})

module.exports = factory