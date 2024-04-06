import bcrypt from 'bcrypt'

const hashPassword = (password) => {
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

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

export { hashPassword, comparePassword }