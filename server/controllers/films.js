import { db } from '../db.js'

export function getFilms(req, res) {
    let query = `SELECT films.id, link, title, original_title, description, country, film_types.name film_type, age_limits.name age_limit, release_date, 
    release_date_streams, release_date_russia, created_at, trailer_ytId, director 
    FROM films 
    JOIN film_types ON film_types.id=film_type JOIN age_limits ON age_limits.id=age_limit`

    const link = req.query.link
    const genre_id = req.query.genre_id

    if (genre_id)
        query = `SELECT films.id, link, title, original_title, description, country, film_types.name film_type, age_limits.name age_limit, release_date, 
    release_date_streams, release_date_russia, created_at, trailer_ytId, director 
    FROM film_genres 
    JOIN films ON films.id=film_id
    JOIN film_types ON film_types.id=film_type 
    JOIN age_limits ON age_limits.id=age_limit
    WHERE genre_id=${genre_id}`

    query += link && !genre_id ? ` WHERE link="${link}"` : ' ORDER BY films.id DESC'

    db.query(query)
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}

export function getFilmGenres(req, res) {
    const filmId = req.query.id

    if(!filmId) return res.status(404).send("Пожалуйста, введите id кино")

    db.query(`SELECT genres.id, genres.name FROM film_genres JOIN genres ON genres.id=genre_id WHERE film_id=?`, [filmId])
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}

export function getFilmVotes(req, res) {
    const filmId = req.query.id

    db.query(`SELECT SUM(film_ratings.voted) rating, COUNT(film_ratings.voted) count FROM film_ratings WHERE film_id=?`, filmId)
    .then(([result]) => res.json(result[0]))
    .catch(err => res.json(err))
}

export function getFilmReviewsCount(req, res) {
    const filmId = req.query.id

    db.query(`SELECT COUNT(reviews.id) count FROM reviews WHERE film_id=?`, filmId)
    .then(([result]) => res.json(result[0]))
    .catch(err => res.json(err))
}

export const getFilmVoted = (req, res) => {
    const userLogin = req.query.user_login,
          filmId    = req.query.id
    
    db.query(`SELECT voted FROM film_ratings WHERE user_id=(SELECT id FROM users WHERE login=?) AND film_id=?`, [userLogin,filmId])
    .then(([result]) => res.json(!result[0] ? 0 : result[0].voted))
    .catch(err => res.json(err))
}

export function voteFilm(req, res) {
    const userLogin = req.body.user_login,
          filmId    = req.body.film_id,
          voted     = req.body.voted

    if (!userLogin)
        return res.status(401).json("Не авторизованный пользователь")

    if(voted == 0)
        db.query(`DELETE FROM film_ratings WHERE user_id=(SELECT id FROM users WHERE login=?) AND film_id=?`, [userLogin,filmId])
        .then(() => { return res.status(200).send(`Оценка фильма #${filmId} пользователя ${userLogin} была удалена`) })
        .catch(err => res.status(500).json(err))
    else
        db.query(`INSERT INTO film_ratings(user_id,film_id,voted) VALUES ((SELECT id FROM users WHERE login="${userLogin}"), ${filmId}, ${voted}) ON DUPLICATE KEY UPDATE voted=VALUES(voted)`)
        .then(() => { return res.status(200).send(`К фильму #${filmId} добавлено ${voted} от пользователя ${userLogin}`) })
        .catch(err => res.status(500).json(err))
}