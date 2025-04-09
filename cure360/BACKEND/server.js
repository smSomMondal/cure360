import express from 'express'
import cors from 'cors'

import './mongo.connect.js'
const app=express()
app.use(express.json())
app.use(cors())








app.listen(5000,()=>{console.log("server running")})
