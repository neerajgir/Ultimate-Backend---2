import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app =  express()

app.get("/", (req,res)=>{
    res.send("hello")
})

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})