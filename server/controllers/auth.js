import db from '../db.js'
import { hashPassword, comparePassword } from '../helpers/passwords.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    let mail     = req.body.mail     && req.body.mail[0].trim(),
        username = req.body.username && req.body.username[0].trim(),
        login    = req.body.login    && req.body.login[0].trim(),
        password = req.body.password && req.body.password[0].trim()

    if (!(mail && username && login && password))
        return res.status(500).json('Пожалуйста, введите данные')

    if (password.length < 6)
        return res.status(500).json('Минимальная длина пароля 6 символов')

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
                db.query(`INSERT INTO profiles(user_id,username) VALUES ((SELECT id FROM users ORDER BY id DESC LIMIT 1), ?)`, [username])
                .then(res.send(`Пользователь '${username}' успешно зарегистрирован!`) )
                .catch(err => res.status(500).json(err))
            )
            .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}

const loginUser = async (req, res) => {
    const match = await comparePassword(req.inputPassword, req.password)
    if(!match)
        return res.status(500).json('Неверный пароль')

    const token = jwt.sign({ id: req.others.id }, 'secret')
    res.cookie('accessToken', token, {
        httpOnly: true
    }).status(200).json(req.others)
}

const login = async (req, res) => {
    let login         = req.body.login    && req.body.login[0].trim(),
        inputPassword = req.body.password && req.body.password[0].trim()

    if (!(login && inputPassword))
        return res.status(500).json('Пожалуйста, введите свой логин и пароль')

    db.query(`SELECT * FROM users WHERE login=?`, [login])
    .then(([result]) => {
        if (result.length == 0)
            return res.status(404).json('Аккаунта с таким логином не существует')

        const { password, ...others } = result[0]
        loginUser({inputPassword, password, others}, res)
    })
    .catch(err => res.status(500).json(err))
}

const logout = async (req, res) => {
    res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none'
    }).status(200).json('Вы успешно вышли из аккаунта')
}

export { register, login, logout }