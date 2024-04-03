import { db } from "../db.js"

export const getFilms = (req, res) => {
    db.query(`SELECT films.id, title, original_title, description, film_types.name film_type, age_limits.name age_limit FROM films JOIN film_types ON film_types.id=film_type JOIN age_limits ON age_limits.id=age_limit GROUP BY films.id`, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}

export const getFilm = (req, res) => {
    let id = req.params.film_id
    db.query(`SELECT films.id, title, original_title, description, film_types.name film_type, age_limits.name age_limit FROM films JOIN film_types ON film_types.id=film_type JOIN age_limits ON age_limits.id=age_limit WHERE films.id=?`, id, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}

export const getGenres = (req, res) => {
    let id = req.params.film_id
    db.query(`SELECT genres.id, genres.name FROM film_genres JOIN genres ON genres.id=genre_id WHERE film_id=?`, id, (err,data) => {
        if(err) return res.json(err)
        res.json(data)
    })
}