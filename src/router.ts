import { Router, Request, Response } from "express";
import { body, oneOf, validationResult } from 'express-validator'
import { handlerInputsErrors } from "./modules/middlewares";

export const router = Router()

enum UPDATE_STATUS {
    IN_PROGRESS,
    SHIPPED,
    DEPRECATED
}

// Product
router.get('/product', (req, res) => {
    res.json({ msg: 'Hello from product' })
})
router.get('/product/:id', () => { })
router.put('/product/:id', 
    body('name').exists().isString(), 
    handlerInputsErrors, 
    (req: Request, res: Response) => {

    res.json({ msg: "Ok" })

})
router.post('/product', () => { })
router.delete('/product/:id', () => { })



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