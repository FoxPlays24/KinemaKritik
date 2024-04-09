import { db } from '../db.js'

export const getReviewLikes = (req, res) => {
    let id = req.params.review_id
    db.query(`SELECT SUM(review_ratings.liked) rating FROM reviews JOIN review_ratings ON review_ratings.review_id=reviews.id WHERE reviews.id=?`, 
        id, (err,data) => {
        if(err) return res.json(err)
        res.json(data[0].rating)
    })
}

export const likeReview = async (req, res) => {
    let user_id = req.body.user_id
    let review_id = req.body.review_id
    let liked = req.body.liked

    if(liked == 0)
        db.query('DELETE FROM review_ratings WHERE user_id=? AND review_id=?', [user_id,review_id],
        (err) => { 
            if (err) return res.status(500).json(err)
            res.send(`Оценка рецении #${review_id} пользователя ${user_id} была удалена`) 
        })
    else
        db.query(`INSERT INTO review_ratings(user_id,review_id,liked) VALUES (${user_id}, ${review_id}, ${liked}) ON DUPLICATE KEY UPDATE liked=VALUES(liked)`, 
        (err) => { 
            if (err) return res.status(500).json(err)
            res.send(`К рецензии #${review_id} добавлено ${liked} от пользователя ${user_id}`) 
        })
}

export const getReviewLiked = (req, res) => {
    let user_id = req.params.user_id
    let review_id = req.params.review_id
    
    db.query('SELECT liked FROM review_ratings WHERE user_id=? AND review_id=?', 
        [user_id,review_id], (err,data) => {
        if(err) return res.json(err)
        res.json(data[0] && data[0].liked)
    })
}

export const review = (req, res) => {
    let user_id = req.body.user_id
    let film_id = req.body.film_id
    let title = req.body.title
    let content = req.body.content

    if(!(title.trim && content.trim))
        return res.status(500).json('Пожалуйста, введите данные')

    db.query('SELECT id FROM reviews WHERE user_id=? AND film_id=?', [user_id,film_id], (err,data) => {
        if (err) return res.status(500).json(err)
        if (data.length > 0)
            db.query(`UPDATE reviews SET title="${title}", content="${content}" WHERE id=${data[0].id}`, 
            (err) => { 
                if (err) return res.status(500).json(err)
                res.send(`Рецензия пользователя ${user_id} на фильм ${film_id} успешно отредактирована`) 
            })
        else
            db.query('INSERT INTO reviews(user_id,film_id,title,content) VALUES (?)', [[user_id,film_id,title,content]],
            (err) => { 
                if (err) return res.status(500).json(err)
                res.send(`Рецензия пользователя ${user_id} на фильм ${film_id} успешно добавлена`) 
            })
    })
}

export const reviewRemove = (req, res) => {
    let id = req.body.review_id

    db.query('DELETE FROM reviews WHERE id=?', [id], (err) => { 
        if (err) return res.status(500).json(err)
        res.send(`Рецензия успешно удалена`) 
    })
}