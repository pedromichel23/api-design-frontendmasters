import { Request, Response} from 'express'
import { prisma } from '../db'

// Obtener todos los productos de un usuario especifico
export const getProducts = async (req:Request, res:Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({data: user?.products})
}

// Obtener un producto en especifico
export const getOneProduct =  async (req:Request, res:Response) => {
    const idProduct = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id: idProduct,
            belongsToId: req.user.id
        }
    })

    res.json({data: product})
}

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })

    res.json({data: product})
}

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({data: product})
}

// Borrar un producto
export const deleteProduct = async (req: Request, res:Response) => {
    const product = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })

    res.json({data: product})
}