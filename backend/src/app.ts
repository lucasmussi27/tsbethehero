import express from "express"
import cors from "cors"
import { errors } from "celebrate"
import routes from "./routes"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'backend is working' })
})

app.use(routes)
app.use(errors())

export default app