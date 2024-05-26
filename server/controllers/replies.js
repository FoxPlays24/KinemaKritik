import { db } from '../db.js'

export function getReplies(req, res) {
    let query = `SELECT replies.id, review_id, users.login, profiles.username, profile_image, content, replies.created_at, parent_id FROM users 
    JOIN replies ON replies.user_id=users.id
    JOIN profiles ON profiles.user_id=replies.user_id`

    const replyId  = req.query.id
    const reviewId  = req.query.review_id
    const userLogin = req.query.user_login
    const parentId = req.query.parent_id
    
    query += parentId ? ` WHERE parent_id=${parentId}` :
    reviewId ? ` WHERE replies.review_id=${reviewId}` :
    replyId ? ` WHERE replies.id=${replyId}` :
    userLogin ? ` WHERE users.login="${userLogin}"` : ""
    
    db.query(query += " ORDER BY replies.id DESC")
    .then(([result]) => res.json(result))
    .catch(err => res.status(500).json(err))
}

export const reply = (req, res) => {
    const userLogin = req.body.user_login,
          reviewId  = req.body.review_id,
          parentId  = req.body.parent_id,
          content   = req.body.content

    if(!content)
        return res.status(500).send('Пожалуйста, введите данные')

    db.query(`SELECT id FROM users WHERE login=?`, [userLogin]).then(([user]) =>
    {
        db.query(`INSERT INTO replies(user_id,review_id,content,parent_id) VALUES (?)`, [[user[0].id,reviewId,content,parentId]])
        .then(() => { return res.status(200).send(`Ответ пользователя ${userLogin} успешно добавлен`) })
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
}

export const replyDelete = (req, res) => {
    const replyId = req.query.reply_id

    if(!replyId)
        return res.status(500).send('Пожалуйста, введите id ответа')

    db.query(`DELETE FROM replies WHERE id=?`, [replyId])
    .then(() => { return res.status(200).send(`Ответ #${replyId} успешно удален`) })
    .catch(err => res.status(500).send(err))
}