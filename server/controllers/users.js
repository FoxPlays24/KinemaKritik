import { db } from '../db.js'

export const getUser = (req, res) => {
    let login = req.params.user_login
    db.query(`SELECT profiles.username, profiles.status, (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.user_id=users.id) reviews, profiles.profile_image, profiles.cover_image
              FROM users JOIN profiles ON user_id=users.id WHERE login=?`, login, (err,data) => {
        if(err) return res.json(err)
        res.json(data[0])
    })
}

export const editUser = (req, res) => {
    let userId = req.body.user_id
    let profileImage = req.body.profile_image && `'${Buffer.from(req.body.profile_image).toString()}'`
    let coverImage = req.body.cover_image && `'${Buffer.from(req.body.cover_image).toString()}'`
    let username = req.body.username
    let status = req.body.status

    db.query(`UPDATE profiles SET username='${username}', status='${status}', profile_image=${profileImage}, cover_image=${coverImage} WHERE user_id=${userId}`, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}