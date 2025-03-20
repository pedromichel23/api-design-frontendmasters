import { prisma } from "../db";
import { NextFunction, Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })

        const token = createJWT(user)
        res.json({ token })
    } catch (err: any) {
        //se le asigna el tipo de error
        err.type = 'input'
        next(err)
    }
}

export const signin = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (user?.password) {
        const isValid = await comparePasswords(req.body.password, user.password)
        if (!isValid) {
            res.status(401).json({ msg: 'Invalid password.' })
            return
        }
        const token = createJWT(user)
        res.json({ token })

    } else {
        res.status(401).json({ msg: 'You must give a valid password.' })
    }


}