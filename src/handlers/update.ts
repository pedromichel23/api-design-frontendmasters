import { Request, Response } from 'express'
import { prisma } from '../db'

// Obtener todos los productos de un usuario especifico
export const getUpdates = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        body: string;
        status: any;
        version: string | null;
        asset: string | null;
        productId: string;
    }[]>((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({ data: updates })
}

// Obtener un producto en especifico
export const getOneUpdate = async (req: Request, res: Response) => {
    const idUpdate = req.params.id
    const update = await prisma.update.findUnique({
        where: {
            id: idUpdate,
        }
    })

    res.json({ data: update })
}

// Crear un producto
export const createUpdate = async (req: Request, res: Response) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        res.json({ msg: 'You are not the owner of this product!.' })

    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product?.id } }
        }
    })

    res.json({ data: update })
}

export const updateUpdate = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        body: string;
        status: any;
        version: string | null;
        asset: string | null;
        productId: string;
    }[]>((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({ msg: 'No update found for this product!' })
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({ data: updatedUpdate })

}

export const deleteUpdate = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        body: string;
        status: any;
        version: string | null;
        asset: string | null;
        productId: string;
    }[]>((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({ msg: 'No update found for this product!' })
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deleted })

}