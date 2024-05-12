import { db } from '../db.js'

export function getUser(req, res) {
    const login = req.query.login

    if(!login) return res.send("Please, enter user's login in query")

    db.query(`SELECT profiles.username, profiles.status, (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.user_id=users.id) reviews, profiles.profile_image, profiles.cover_image
              FROM users JOIN profiles ON user_id=users.id WHERE login=?`, login)
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}