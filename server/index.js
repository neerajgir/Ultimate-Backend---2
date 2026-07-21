import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config()

const app =  express()
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRouter)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on ${port}`);
})