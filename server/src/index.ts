import express, { type Application } from 'express'
import cors from 'cors'
import subscriptionRouter from './router'

import './scheduledTasks/subscriptionChecker'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/', subscriptionRouter)

const port: number = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// export default app;
