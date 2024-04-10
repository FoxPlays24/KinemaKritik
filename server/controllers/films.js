import { db } from '../db.js'

export const getFilms = (req, res) => {
    db.query(`SELECT films.id, title FROM films JOIN film_types ON film_types.id=film_type ORDER BY films.id DESC`, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}

export const getFilm = (req, res) => {
    let id = req.params.film_id
    db.query(`SELECT films.id, title, original_title, description, country, film_types.name film_type, age_limits.name age_limit, release_date, release_date_streams, release_date_russia
              FROM films JOIN film_types ON film_types.id=film_type JOIN age_limits ON age_limits.id=age_limit WHERE films.id=?`, id, (err,data) => {
        if(err) return res.json(err)
        res.json(data[0])
    })
}

export const getGenres = (req, res) => {
    let id = req.params.film_id
    db.query(`SELECT genres.id, genres.name FROM film_genres JOIN genres ON genres.id=genre_id WHERE film_id=?`, id, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}

export const getReviews = (req, res) => {
    let id = req.params.film_id
    db.query(`SELECT reviews.id, users.login, profiles.username, profile_image, reviews.title title, content, liked, reviews.created_at FROM reviews 
    JOIN users ON users.id=reviews.user_id 
    JOIN profiles ON profiles.user_id=reviews.user_id
    JOIN film_ratings ON film_ratings.user_id=reviews.user_id AND film_ratings.film_id=reviews.film_id
    WHERE film_ratings.film_id=? ORDER BY reviews.id DESC`, id, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}

export const getUserReview = (req, res) => {
    let film_id = req.params.film_id
    let user_id = req.params.user_id
    db.query(`SELECT reviews.id, users.login, profiles.username, profile_image, title, content, liked, reviews.created_at FROM reviews 
    JOIN users ON users.id=reviews.user_id 
    JOIN profiles ON profiles.user_id=reviews.user_id
    JOIN film_ratings ON film_ratings.user_id=reviews.user_id AND film_ratings.film_id=reviews.film_id
    WHERE film_ratings.film_id=? AND film_ratings.user_id=?`, [film_id,user_id], (err,data) => {
        if(err) return res.json(err)
        res.json(data[0])
    })
}

export const getFilmLikes = (req, res) => {
    let id = req.params.film_id
    db.query(`SELECT SUM(film_ratings.liked) rating FROM film_ratings WHERE film_id=?`, 
        id, (err,data) => {
        if(err) return res.json(err)
        res.json(data[0].rating)
    })
}

export const getFilmLiked = (req, res) => {
    let user_id = req.params.user_id
    let film_id = req.params.film_id
    
    db.query('SELECT liked FROM film_ratings WHERE user_id=? AND film_id=?', 
        [user_id,film_id], (err,data) => {
        if(err) return res.json(err)
        res.json(data[0] && data[0].liked)
    })
}

export const likeFilm = async (req, res) => {
    let user_id = req.body.user_id
    let film_id = req.body.film_id
    let liked = req.body.liked

    if(liked == 0)
        db.query('DELETE FROM film_ratings WHERE user_id=? AND film_id=?', [user_id,film_id],
        (err) => { 
            if (err) return res.status(500).json(err)
            res.send(`Оценка фильма #${film_id} пользователя ${user_id} была удалена`) 
        })
    else
        db.query(`INSERT INTO film_ratings(user_id,film_id,liked) VALUES (${user_id}, ${film_id}, ${liked}) ON DUPLICATE KEY UPDATE liked=VALUES(liked)`, 
        (err) => { 
            if (err) return res.status(500).json(err)
            res.send(`К фильму #${film_id} добавлено ${liked} от пользователя ${user_id}`) 
        })
}