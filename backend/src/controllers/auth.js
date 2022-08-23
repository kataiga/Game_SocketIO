const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../models')
const mailing = require('../controllers/mailing')

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body
    //check if mail and username are already used
    const checkUsername = await db.User.findOne({
        where: {
            username: username
        }
    })
    const checkEmail = await db.User.findOne({
        where: {
            email: email
        }
    })

    if (checkUsername) {
        return res.status(409).send({
            message: 'Username already used'
        })
    }

    if (checkEmail) {
        return res.status(409).send({
            message: 'Email already used'
        })
    }

    //send  mail to confirm mail
    mailing.checkEmailSend(email)

    const user = await db.User.create({
        username,
        email,
        password,
    })
    res.status(201).send(user)
}

exports.login = async (req, res, next) => { 
    const { email, password } = req.body
    const user = await db.User.findOne({
        where: {
            email,
        },
    })
    if(user.attemps > 3) {
        return res.status(401).send({
            message: 'Too many attemps your account is locked'
        })
    }
    if (!user) {
        return res.status(401).send({
            message: 'Invalid credentials mail',
        })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        user.attemps = user.attemps + 1
        await user.save()
        return res.status(401).send({
            message: 'Invalid credentials password',
        })
    }
    user.attemps = 0
    await user.save()
    const token = jwt.sign({ id: user.id }, 'impossible', {
        expiresIn: '1h',
    })
    console.table(user);
    res.status(200).send({
        'id': user.id,
        'username': user.username,
        token,
    })
}

exports.update = async (req, res, next) => {
    const { username, newEmail, password, email } = req.body
    const user = await db.User.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res.status(404).send({
            message: 'User not found',
        })
    }
    if (username) {
        user.username = username
    }
    if (newEmail) {
        user.email = newEmail
    }
    if (password) {
        user.password = bcrypt.hashSync(password, 10)
    }
    await user.save()
    res.status(200).send(user)
}

exports.delete = async (req, res, next) => {
    const { email } = req.body
    const user = await db.User.findOne({
        where: {
            email,
        },
    })
    if (!user) {
        return res.status(404).send({
            message: 'User not found',
        })
    }
    await user.destroy()
    res.status(200).send(user)

}

exports.recoverPassword = async (req, res, next) => {
    const { password, token } = req.body
    try{
        const decoded = jwt.verify(token, 'possible');
        const user = await db.User.findOne({
            where: {
                email: decoded.mail,
            },
        })
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
            })
        }
        user.password = bcrypt.hashSync(password, 10)
        user.attemps = 0
        await user.save()
        res.status(200).send(user)
    } catch(err) {
        return res.status(401).send(decoded)
    }
    
    
}