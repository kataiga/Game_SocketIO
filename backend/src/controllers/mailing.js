const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const db = require('../models')

exports.checkEmailSend = async (mail) => {
    // const token = jwt.sign({ id: user.id, mail: user.mail }, 'possible', {
    //     expiresIn: '1h',
    // })

    let link = '<a href="https://wafm.xyz/confirm-mail?mail=' + mail + '">Confirmer</a>'

    const mailData = {
        from: 'kataigaWam@gmail.com',  // sender address
        to: mail,   // list of receivers
        subject: 'Confirm your email', // Subject line
        text: 'text',
        html: `<b>Hey there! </b>
            <br> Thx for joining us please click on this link to check ur email <br/>
            ${link}`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(info);
      res.send(info);
    }
  })
}

exports.checkEmailConfirm = async (req, res, next) => {
    const mail  = req.query.mail
    const user = await db.User.findOne({
        where: {
            email: mail,
        },
    })
    if (!user) {
        return res.status(404).send({
            message: 'User not found',
        })
    }
    user.confirmed = 1
    await user.save()
    res.status(200).send(user)

}

exports.sendRecoverPassword = async (req, res, next) => {
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
    const token = jwt.sign({ id: user.id, mail: user.email }, 'possible', {
        expiresIn: '1h',
    })

    let link = '<a href="https://wafm.xyz/recover-password?token=' + token + '">Recover password</a>'

    const mailData = {
        from: 'kataigaWam@gmail.com',  // sender address
        to: user.email,   // list of receivers
        subject: 'Recover your password', // Subject line
        text: 'text',
        html: `<b>Hey there! </b>
            <br> if you want to reset your password click in this button <br/>
            ${link}`,
    }

    transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(info);
          res.send(info);
        }
    })
}

transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.sendgrid.net",
       auth: {
            user: 'apikey',
            pass: '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',
         },
    secure: true,
});