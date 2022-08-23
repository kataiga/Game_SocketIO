const factories = require('../factories')
const db = require('../../src/models')

// before( async function() {
//     try {
//         const user = await factories.create('User')
//     } catch (e) {
//         console.error(e)
//     }
// })

after( async function() {
    await db.sequelize.sync({ force: true })
})
