import bcrypt from 'bcrypt'

export function hashPassword(password) {
    return new Promise((res, rej) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) rej(err)
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) rej(err)
                res(hash)
            })
        })
    })
}

export function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}