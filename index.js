import  express from "express";
import { studentRouter } from "./Routes/student.js";
import dotenv from "dotenv"

dotenv.config()


const port=process.env.port

const app=express();

app.use(express.json())

app.use('/',studentRouter)

app.listen(port,()=>console.log(`server started in localhost:${port}`))