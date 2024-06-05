export interface IFilm {
    id:                   number
    link:                 string
    title:                string
    original_title?:      string
    description:          string
    country:              string
    film_type:            string
    age_limit:            string
    release_date:         Date
    release_date_streams: Date
    release_date_russia:  Date
    created_at:           Date
    trailer_ytId:         string
    director:             string
}

export interface IReview {
    id:            number
    login:         string
    username:      string
    profile_image: string
    title:         string
    content:       string
    voted:         number
    created_at:    Date
    link:          string
    film_title:    string
}

export interface IReply {
    id:            number
    review_id:     number
    login:         string
    username:      string
    profile_image: string
    content:       string
    created_at:    Date
    parent_id:     number
}

export interface IGenre {
    id:   number
    name: string
}