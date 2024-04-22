import db from '../db.js'

export const getUser = (req, res) => {
    let login = req.params.user_login

    db.query(`SELECT profiles.username, profiles.status, (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.user_id=users.id) reviews, profiles.profile_image, profiles.cover_image
              FROM users JOIN profiles ON user_id=users.id WHERE login=?`, login)
    .then(([result]) => res.json(result[0]))
    .catch(err => res.json(err))
}

export const editUser = (req, res) => {
    let userId       = req.body.user_id,
        profileImage = req.body.profile_image && `'${Buffer.from(req.body.profile_image).toString()}'`,
        coverImage   = req.body.cover_image   && `'${Buffer.from(req.body.cover_image).toString()}'`,
        username     = req.body.username,
        status       = req.body.status
    
    db.query(`UPDATE profiles SET username='${username}', status='${status}', profile_image=${profileImage}, cover_image=${coverImage} WHERE user_id=${userId}`)
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}