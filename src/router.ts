import { Router, Request, Response } from "express";
import { body, oneOf, validationResult } from 'express-validator'
import { handlerInputsErrors } from "./modules/middlewares";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";

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
router.get('/update', () => { })
router.get('/update/:id', () => { })
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').optional()
        .isIn([UPDATE_STATUS.DEPRECATED,
        UPDATE_STATUS.IN_PROGRESS,
        UPDATE_STATUS.SHIPPED]
        ),
    body('version').optional(),
    () => { })
router.post('/update', () => { })
router.delete('/update/:id', () => { })


// Update Point
router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id', () => { })
router.post('/updatepoint', () => { })
router.delete('/updatepoint/:id', () => { })