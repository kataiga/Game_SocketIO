const db = require('../models')

exports.getAllUsers = async (req, res, next) => {
    const allUsers = await db.User.findAll({
        attributes: ['id', 'username', 'email', 'password'],
    })
    res.status(200).send(allUsers)
}

exports.getOneUser = async (req, res, next) => {
    const user = await db.User.findOne({
        where: { email: req.user.email },
        attributes: ['id', 'username', 'email', 'password'],
    })
    res.status(200).send(user)
}