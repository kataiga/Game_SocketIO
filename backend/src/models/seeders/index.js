const db = require('../index')

const createSeeds = async () => {

    const userFutaba = await db.User.create({
        username: 'Oracle',
        email: 'futaba@wam.com',
        password: 'joker',
        confirmed: 1,
    })

    const userJoker = await db.User.create({
        username: 'Joker',
        email: 'joker@wam.com',
        password: 'futaba',
        confirmed: 1,
    })

    const userAnn = await db.User.create({
        username: 'Panther',
        email: 'ann@wam.com',
        password: 'joker',
        confirmed: 1,
    })

    const userMorgana = await db.User.create({
        username: 'Mona',
        email: 'morgana@wam.com',
        password: 'ann',
        confirmed: 1,
    })

    const userHaru = await db.User.create({
        username: 'Noir',
        email: 'haru@wam.com',
        password: 'joker',
        confirmed: 1,
    })

}

const deleteSeeds = async () => {
    await db.User.destroy
}

module.exports = {createSeeds, deleteSeeds}