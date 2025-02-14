import express from 'express'
import { router } from './router'
import morgan from 'morgan'

export const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log('hello from express')
    res.status(200)
    res.json({ message: 'Hello!!!' })
})

app.use('/api', router)
