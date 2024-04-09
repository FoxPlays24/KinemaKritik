import { db } from '../db.js'

export const getUser = (req, res) => {
    let login = req.params.user_login
    db.query('SELECT profiles.username, profiles.status FROM users JOIN profiles ON user_id=users.id WHERE login=?', login, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}