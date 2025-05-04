import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
const app = express ()

dotenv.config()

app.use(express.json()) // Middleware to parse JSON data
app.use(express.urlencoded({extended:true})) // Middleware to parse URL-encoded data
app.use(cookieParser()) // Middleware to parse cookies

app.get('/',(req,res)=>{
    res.send("Hello Welcome to own leetcode ❤❤ ")
})

app.use('/api/v1/auth',authRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 8080")
})