import { db } from '../db.js'
import { hashPassword, comparePassword } from '../helpers/passwords.js'
import nodemailer from 'nodemailer'

export async function register(req, res) {
    const mail     = req.body.mail     && req.body.mail    .trim(),
          login    = req.body.login    && req.body.login   .trim(),
          password = req.body.password && req.body.password.trim()

    if (!(mail && login && password))
        return res.status(500).json('Пожалуйста, введите данные')

    if (password.length < 6)
        return res.status(500).json('Минимальная длина пароля 6 символов')

    const regexCheck = /(?=.*[!@#$%^&*()+:;.,])/;
    if (regexCheck.test(login) || regexCheck.test(password))
        return res.status(500).json('Логин/пароль не должен содержать специальные символы (!"№;%:?*()+:;.,)')
 
    const hashedPassword = await hashPassword(password)

    db.query(`SELECT id FROM users WHERE mail=?`, [mail])
    .then(([result]) => {
        if(result.length > 0)
            return res.status(500).json('Аккаунт с такой почтой уже существует')
        
        db.query(`SELECT id FROM users WHERE login=?`, [login])
        .then(([result]) => {
            if (result.length > 0)
                return res.status(500).json('Аккаунт с таким логином уже существует')

            db.query(`INSERT INTO users(mail,login,password) VALUES (?)`, [[mail,login,hashedPassword]])
            .then(
                db.query(`INSERT INTO profiles(user_id,username) VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1), ?)`, [login])
                .then(res.status(200).send("Успешно зарегистрирован"))
                .catch(err => res.status(500).json(err))
            )
            .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}

async function comparePasswords(req, res) {
  const match = await comparePassword(req.inputPassword, req.password)
  
  if(!match)
      return res.status(500).json('Неверный пароль')

  res.status(200).json(req.others)
}

export async function login(req, res) {
    const loginMail     = req.body.loginMail && req.body.loginMail.trim(),
          inputPassword = req.body.password  && req.body.password .trim()

    if (!(loginMail && inputPassword))
        return res.status(500).json('Пожалуйста, введите свой логин/почту и пароль')

    db.query(`SELECT login, password FROM users WHERE login=? OR mail=?`, [loginMail,loginMail])
    .then(([result]) => {
        if (result.length == 0)
            return res.status(404).json('Аккаунта с таким логином/почтой не существует')

        const { password, ...others } = result[0]
        
        comparePasswords({inputPassword, password, others}, res)
    })
    .catch(err => res.status(500).json(err))
}

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
        service: 'postfix',
        host: 'localhost',
        secure: false,
        port: 25,
        auth: { user: process.env.LINUX_USER, pass: process.env.LINUX_PASSWORD },
        tls: { rejectUnauthorized: false }
    })

    const mailOptions = {
        from: process.env.LINUX_USER,
        to: mail,
        subject: 'Сброс пароля на КинемаКритик',
        text: "Ваш код для сброса пароля: " + code
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
        db.query(`INSERT INTO password_recovery(code,user_login) VALUES(?)`, [[code, result[0].login]])
        sendMail(code, result[0].mail)
        return res.json(result[0])
    })
    .catch(err => res.status(500).json(err))
}