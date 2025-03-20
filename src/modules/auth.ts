import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5)
}

const JWT_SECRET: string = process.env.JWT_SECRET as string

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const createJWT = (user: any) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        JWT_SECRET
    )
    return token
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401).json({ msg: 'No authorized!!!' })
    }

    const [, token] = bearer?.split(' ') ?? []
    if (!token) {
        res.status(401).json({ msg: 'Not valid token' })
    }

    // console.log('token: ', token)

    try {
        const user = jwt.verify(token, JWT_SECRET)
        req.user = user
        next()

    } catch (error) {
        res.status(401).json({
            msg: 'Not valid token',
            err: error,
            token: token.length,
            jwt: JWT_SECRET.length,
            tokenContent: token,
            jwtContent: JWT_SECRET

        })
    }
}