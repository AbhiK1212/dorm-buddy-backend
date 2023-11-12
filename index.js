import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import dormRoutes from "./routes/dormRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ limit: "1mb", extended: true}))
app.use(bodyParser.json({limit: "1mb", extended: true}))

app.use("/users", userRoutes)
app.use("/dorm", dormRoutes)

const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() =>{
  app.listen(port, () => console.log("listening on " + port))
}).catch((err) => console.log(err))