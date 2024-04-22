import db from '../db.js'

export const getReviewLikes = (req, res) => {
    let id = req.params.review_id

    db.query(`SELECT SUM(review_ratings.liked) rating FROM reviews JOIN review_ratings ON review_ratings.review_id=reviews.id WHERE reviews.id=?`, id)
    .then(([result]) => res.json(result[0].rating))
    .catch(err => res.json(err))
}

export const likeReview = async (req, res) => {
    let user_id   = req.body.user_id,
        review_id = req.body.review_id,
        liked     = req.body.liked

    if(liked == 0)
        db.query(`DELETE FROM review_ratings WHERE user_id=? AND review_id=?`, [user_id,review_id])
        .then(res.send(`Оценка рецении #${review_id} пользователя ${user_id} была удалена`))
        .catch(err => res.status(500).json(err))
    else
        db.query(`INSERT INTO review_ratings(user_id,review_id,liked) VALUES (${user_id}, ${review_id}, ${liked}) ON DUPLICATE KEY UPDATE liked=VALUES(liked)`)
        .then(res.send(`К рецензии #${review_id} добавлено ${liked} от пользователя ${user_id}`))
        .catch(err => res.status(500).json(err))
}

export const getReviewLiked = (req, res) => {
    let user_id   = req.params.user_id,
        review_id = req.params.review_id
    
    db.query(`SELECT liked FROM review_ratings WHERE user_id=? AND review_id=?`, [user_id,review_id])
    .then(([result]) => res.json(result[0] && result[0].liked))
    .catch(err => res.json(err))
}

export const review = (req, res) => {
    let user_id = req.body.user_id,
        film_id = req.body.film_id,
        title   = req.body.title   && req.body.title,
        content = req.body.content && req.body.content

    if(!(title && content))
        return res.status(500).json('Пожалуйста, введите данные')

    db.query(`SELECT id FROM reviews WHERE user_id=? AND film_id=?`, [user_id,film_id])
    .then(([result]) => {
        if (result.length > 0)
            db.query(`UPDATE reviews SET title="${title}", content="${content}" WHERE id=${result[0].id}`)
            .then(res.send(`Рецензия пользователя ${user_id} на фильм ${film_id} успешно отредактирована`))
            .catch(err => res.status(500).json(err))
        else
            db.query(`INSERT INTO reviews(user_id,film_id,title,content) VALUES (?)`, [[user_id,film_id,title,content]])
            .then(res.send(`Рецензия пользователя ${user_id} на фильм ${film_id} успешно добавлена`))
            .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
}

export const reviewRemove = (req, res) => {
    let id = req.body.review_id

    db.query(`DELETE FROM reviews WHERE id=?`, id)
    .then(res.send(`Рецензия успешно удалена`))
    .catch(err => res.status(500).json(err))
}

export const getAllReviews = (req, res) => {
    db.query(`SELECT reviews.id, users.login, profiles.username, profile_image, reviews.title title, content, liked, reviews.created_at, film_ratings.film_id, films.title film_title FROM reviews 
              JOIN users ON users.id=reviews.user_id 
              JOIN profiles ON profiles.user_id=reviews.user_id
              JOIN film_ratings ON film_ratings.user_id=reviews.user_id AND film_ratings.film_id=reviews.film_id
              JOIN films ON films.id=film_ratings.film_id ORDER BY reviews.id DESC`)
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}

export const getUserReviews = (req, res) => {
    let id = req.params.user_login
    
    db.query(`SELECT reviews.id, users.login, profiles.username, profile_image, reviews.title title, content, liked, reviews.created_at, film_ratings.film_id, films.title film_title FROM users 
              JOIN reviews ON reviews.user_id=users.id
              JOIN profiles ON profiles.user_id=reviews.user_id
              JOIN film_ratings ON film_ratings.user_id=reviews.user_id AND film_ratings.film_id=reviews.film_id
              JOIN films ON films.id=film_ratings.film_id WHERE users.login=? ORDER BY reviews.id DESC`, id)
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}