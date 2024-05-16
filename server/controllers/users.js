import { db } from '../db.js'

export function getUser(req, res) {
    const login = req.query.login

    if(!login) return res.send("Please, enter user's login in query")

    db.query(`SELECT profiles.username, profiles.status, (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.user_id=users.id) reviews, profiles.profile_image, profiles.cover_image
              FROM users JOIN profiles ON user_id=users.id WHERE login=?`, login)
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}

export const editUser = (req, res) => {
    const login        = req.body.login,
          profileImage = req.body.profile_image ? `'${Buffer.from(req.body.profile_image).toString()}'` : null,
          coverImage   = req.body.cover_image ? `'${Buffer.from(req.body.cover_image).toString()}'` : null,
          username     = req.body.username,
          status       = req.body.status || ""

    db.query(`UPDATE profiles SET username='${username}', status='${status}', profile_image=${profileImage}, cover_image=${coverImage} WHERE user_id=(SELECT id FROM users WHERE login='${login}')`)
    .then(([result]) => res.json(result))
    .catch(err => res.status(500).send(err))
}