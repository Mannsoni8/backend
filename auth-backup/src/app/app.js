import express from 'express'
import routes from '../routes/user.routes.js'

const app = express()

app.use('/auth',routes)

export default app