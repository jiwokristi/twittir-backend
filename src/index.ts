import express from 'express'
import cors from 'cors'

import routes from './routes'

import errorHandler from './middlewares/errorHandler'

const app = express()

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(routes)
  .use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? 4000 : 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

export default app
