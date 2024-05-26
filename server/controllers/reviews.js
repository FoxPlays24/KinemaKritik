import { db } from '../db.js'

export function getReviews(req, res) {
    let query = `SELECT reviews.id, users.login, profiles.username, profile_image, reviews.title title, content, voted, reviews.created_at, films.link, films.title film_title FROM users 
    JOIN reviews ON reviews.user_id=users.id
    JOIN profiles ON profiles.user_id=reviews.user_id
    JOIN film_ratings ON film_ratings.user_id=reviews.user_id AND film_ratings.film_id=reviews.film_id
    JOIN films ON films.id=film_ratings.film_id`
    const reviewId  = req.query.id
    const userLogin = req.query.user_login
    const filmLink  = req.query.film
    
    query += userLogin && filmLink ? ` WHERE users.login="${userLogin}" AND films.link="${filmLink}"` :
    reviewId ? ` WHERE reviews.id="${reviewId}"` :
    userLogin ? ` WHERE users.login="${userLogin}"` :
    filmLink ? ` WHERE films.link="${filmLink}"` : ""
    
    db.query(query += " ORDER BY reviews.id DESC")
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}

export function getReviewVotes(req, res) {
    const reviewId = req.query.id
    db.query(`SELECT SUM(review_ratings.voted) rating, COUNT(review_ratings.voted) count FROM review_ratings WHERE review_id=?`, reviewId)
    .then(([result]) => res.json(result[0]))
    .catch(err => res.json(err))
}

export const getReviewVoted = (req, res) => {
    const userLogin = req.query.user_login,
          reviewId = req.query.id
    
    db.query(`SELECT voted FROM review_ratings WHERE user_id=(SELECT id FROM users WHERE login=?) AND review_id=?`, [userLogin,reviewId])
    .then(([result]) => res.json(!result[0] ? 0 : result[0].voted))
    .catch(err => res.json(err))
}

export const getReviewRepliesCount = (req, res) => {
    const reviewId = req.query.id
    db.query(`SELECT COUNT(id) replies_count FROM replies WHERE review_id=?`, reviewId)
    .then(([result]) => res.json(result[0].replies_count))
    .catch(err => res.json(err))
}

export function voteReview(req, res) {
    const userLogin = req.body.user_login,
          reviewId  = req.body.review_id,
          voted     = req.body.voted

    if (!userLogin)
        return res.status(401).json("Не авторизованный пользователь")

    if(voted == 0)
        db.query(`DELETE FROM review_ratings WHERE user_id=(SELECT id FROM users WHERE login=?) AND review_id=?`, [userLogin,reviewId])
        .then(() => { return res.status(200).send(`Оценка рецении #${reviewId} пользователя ${userLogin} была удалена`) })
        .catch(err => res.status(500).json(err))
    else
        db.query(`INSERT INTO review_ratings(user_id,review_id,voted) VALUES ((SELECT id FROM users WHERE login="${userLogin}"), ${reviewId}, ${voted}) ON DUPLICATE KEY UPDATE voted=VALUES(voted)`)
        .then(() => { return res.status(200).send(`К рецензии #${reviewId} добавлено ${voted} от пользователя ${userLogin}`) })
        .catch(err => res.status(500).json(err))
}

export const review = (req, res) => {
    const userLogin = req.body.user_login,
          filmLink  = req.body.link,
          title     = req.body.title,
          content   = req.body.content

    if(!(title && content))
        return res.status(500).json('Пожалуйста, введите данные')

    db.query(`SELECT id FROM users WHERE login=?`, [userLogin]).then(([user]) => 
    db.query(`SELECT id FROM films WHERE link=?`, [filmLink]).then(([film]) => 
        db.query(`SELECT id FROM reviews WHERE user_id=? AND film_id=?`, [user[0].id,film[0].id])
        .then(([review]) => {
            if (review.length > 0)
                db.query(`UPDATE reviews SET title="${title}", content="${content}" WHERE id=${review[0].id}`)
                .then(() => { return res.status(200).send(`Рецензия пользователя ${userLogin} на фильм ${filmLink} успешно отредактирована`) })
                .catch(err => res.status(500).json(err))
            else
                db.query(`INSERT INTO reviews(user_id,film_id,title,content) VALUES (?)`, [[user[0].id,film[0].id,title,content]])
                .then(() => { return res.status(200).send(`Рецензия пользователя ${userLogin} на фильм ${filmLink} успешно добавлена`) })
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
    )
    )
}

export const reviewRemove = (req, res) => {
    const id = req.body.review_id

    db.query(`DELETE FROM reviews WHERE id=?`, [id])
    .then(() => { return res.status(200).send(`Рецензия успешно удалена`) })
    .catch(err => res.status(500).json(err))
}