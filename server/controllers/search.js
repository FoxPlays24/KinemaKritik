import { db } from '../db.js'

export const getSearch = (req, res) => {
    const query = req.query.query

    if(!query)
        return res.status(500).send('Пожалуйста, введите запрос')

    // Films
    db.query(`SELECT 'film' type, link, title FROM films WHERE CONCAT(title,original_title) LIKE '%${query}%'`)
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