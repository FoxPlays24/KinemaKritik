import { db } from '../db.js'

export const getSearch = (req, res) => {
    const query = req.query.query

    if(!query)
        return res.status(500).send('Пожалуйста, введите запрос')

    // Films
    db.query(`SELECT 'film' type, link, title FROM films WHERE CONCAT(title,IFNULL(original_title,"")) LIKE '%${query}%'`)
    .then(([films]) => {
        // Users
        db.query(`SELECT 'user' type, login link, IFNULL(username,login) title FROM users JOIN profiles ON user_id=users.id WHERE CONCAT(username,login) LIKE '%${query}%'`)
        .then(([users]) => {
            // Genres
            db.query(`SELECT 'genre' type, id link, name title FROM genres WHERE name LIKE '%${query}%'`)
            .then(([genres]) => {
                res.json([].concat.apply([], [films, genres, users]))
            })
            .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
}

export const getPosts = (req, res) => {
    db.query(`(
        SELECT 'film' type, id, NULL login, NULL username, NULL profile_image, title, NULL content, NULL voted, release_date, created_at, link, NULL film_title, description FROM films
        UNION ALL
        SELECT 'review' type, reviews.id, users.login, profiles.username, profile_image, reviews.title title, content, voted, NULL release_date, reviews.created_at, films.link, films.title film_title, NULL description FROM users 
                JOIN reviews ON reviews.user_id=users.id
                JOIN profiles ON profiles.user_id=reviews.user_id
                JOIN film_ratings ON film_ratings.user_id=reviews.user_id AND film_ratings.film_id=reviews.film_id
                JOIN films ON films.id=film_ratings.film_id
        )
        ORDER BY created_at DESC`)
    .then(([posts]) => res.json(posts))
    .catch(err => res.json(err))
}