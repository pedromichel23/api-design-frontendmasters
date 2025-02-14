import jwt from 'jsonwebtoken'
import { request, response } from 'express'

export const createJWT = (user: any) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        process.env.JWT_SECRET as string
    )
    return token
}

export const protect = (req = request, res = response) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401).json({ msg: 'No authorized!!!' })
    }
}