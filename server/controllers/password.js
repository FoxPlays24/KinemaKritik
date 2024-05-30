import { db } from '../db.js'
import { hashPassword } from '../helpers/passwords.js'
import nodemailer from 'nodemailer'

function generateRandomCode(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    const randomArray = new Uint8Array(length)
    crypto.getRandomValues(randomArray)
    randomArray.forEach((number) => 
      result += chars[number % chars.length])
    return result;
}

function sendMail(code, mail) {
    const transporter = nodemailer.createTransport({
        port: 25,
        host: 'localhost'
    })

    const mailOptions = {
        from: `"КинемаКритик" <no-reply@${process.env.MAIL_ADDRESS}>`,
        to: mail,
        subject: 'Сброс пароля на КинемаКритик',
        text: `Ваш код для сброса пароля: ${code}\n${process.env.CLIENT_URL}`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error)
        else console.log('Отправлено письмо: ' + info.response)
    })
}
  

export async function compareLoginPassword(req, res) {
    const loginMail = req.body.login_mail && req.body.login_mail.trim()
    
    if (loginMail.length == 0)
        return res.status(404).json('Пожалуйста, введите свой логин/почту')
  
    db.query(`SELECT login, mail FROM users WHERE login=? OR mail=?`, [loginMail,loginMail])
    .then(([result]) => {
        if (result.length == 0)
            return res.status(404).json('Аккаунта с таким логином/почтой не существует')
        const code = generateRandomCode(8)
        db.query(`INSERT INTO password_recovery(code, user_login) VALUES(?)`, [[code, result[0].login]])
        .then(() => {
            sendMail(code, result[0].mail)
            return res.json(result[0])
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}

export async function compareCodes(req, res) {
    const code = req.query.code && req.query.code.trim()
    
    if (code.length == 0)
        return res.status(404).json('Пожалуйста, введите код')
  
    db.query(`SELECT code FROM password_recovery WHERE code=?`, [code])
    .then(([result]) => {
        if (result.length == 0)
            return res.status(404).json('Введен неверный код')
        return res.sendStatus(200)
    })
    .catch(err => res.status(500).json(err))
}

// Most insecure thing ever

export async function changePassword(req, res) {
    const newPassword = req.body.new_password && req.body.new_password.trim(),
          code        = req.body.code         && req.body.code        .trim()
    
    if (newPassword.length == 0)
        return res.status(404).json('Пожалуйста, введите новый пароль')

    if (newPassword.length < 6)
        return res.status(500).json('Минимальная длина пароля 6 символов')

    const regexCheck = /(?=.*[!@#$%^&*()+:;.,])/;
    if (regexCheck.test(newPassword))
        return res.status(500).json('Пароль не должен содержать специальные символы (!"№;%:?*()+:;.,)')
 
    const hashedPassword = await hashPassword(newPassword)
    
    db.query(`SELECT user_login FROM password_recovery WHERE code=?`, [code])
    .then(([result]) => {
        db.query(`UPDATE users SET password=? WHERE login=?`, [hashedPassword, result[0].user_login])
        .then(() => {
            db.query(`DELETE FROM password_recovery WHERE code=?`, [code])
            .then(res.status(200).json(result[0]))
            .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err) )
}
