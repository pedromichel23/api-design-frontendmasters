import { Router, Request, Response, NextFunction } from "express";
import { body, oneOf, validationResult } from 'express-validator'
import { handlerInputsErrors } from "./modules/middlewares";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update";

export const router = Router()

enum UPDATE_STATUS {
    IN_PROGRESS,
    SHIPPED,
    DEPRECATED
}

// Product
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id',
    body('name').exists().isString(),
    handlerInputsErrors,
    updateProduct
)
router.post('/product',
    body('name').isString(),
    handlerInputsErrors,
    createProduct)
router.delete('/product/:id', deleteProduct)



// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').optional()
        .isIn([UPDATE_STATUS.DEPRECATED,
        UPDATE_STATUS.IN_PROGRESS,
        UPDATE_STATUS.SHIPPED]
        ),
    body('version').optional(),
    updateUpdate)
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)


// Update Point
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', () => { })
router.post('/updatepoint', () => { })
router.delete('/updatepoint/:id', () => { })

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' })
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' })
    } else {
        res.status(500).json({ message: `Error 2: ${err.message}` })
    }
})