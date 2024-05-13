import { db } from '../db.js'

export function getReplies(req, res) {
    let query = `SELECT replies.id, users.login, profiles.username, profile_image, content, replies.created_at, parent_id FROM users 
    JOIN replies ON replies.user_id=users.id
    JOIN profiles ON profiles.user_id=replies.user_id`

    const replyId  = req.query.id
    const userLogin = req.query.user_login
    
    query += userLogin && filmLink ? ` WHERE users.login="${userLogin}" AND films.link="${filmLink}"` :
    replyId ? ` WHERE reviews.id="${reviewId}"` :
    userLogin ? ` WHERE users.login="${userLogin}"` : ""
    
    db.query(query += " ORDER BY replies.id DESC")
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}

export const reply = (req, res) => {
    const userLogin = req.body.user_login,
          reviewId  = req.body.review_id,
          parentId  = req.body.parent_id,
          content   = req.body.content

    if(!content)
        return res.status(500).json('Пожалуйста, введите данные')

    db.query(`SELECT id FROM users WHERE login=?`, [userLogin]).then(([user]) =>
    {
        db.query(`INSERT INTO replies(user_id,review_id,content,parent_id) VALUES (?)`, [[user[0].id,reviewId,content,parentId]])
        .then(() => { return res.status(200).send(`Ответ пользователя ${userLogin} успешно добавлен`) })
        .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}