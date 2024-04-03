import express, { type Application } from 'express'
import cors from 'cors'
import subscriptionRouter from './router'

import './scheduledTasks/subscriptionChecker'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/', subscriptionRouter)

let port: string | number | undefined = process.env.PORT
if (port === null || port === '') {
  port = 8000
}

app.listen(Number(port), () => {
  console.log(`Server running on port ${port}`)
})

// export default app;
