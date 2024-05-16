import { db } from '../db.js'

export function getGenres(req, res) {
    const genreId = req.query.id

    let query = "SELECT id, name FROM genres"
    query += genreId ? " WHERE id="+genreId : " ORDER BY genres.id DESC"

    db.query(query, [genreId])
    .then(([result]) => res.json(result))
    .catch(err => res.json(err))
}