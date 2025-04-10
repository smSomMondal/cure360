import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const hospitalApi = express.Router()

hospitalApi.post('/add',signup)
hospitalApi.put('/addBed',signin)
hospitalApi.put('/updateBedAvality',forgotPassword)

export default hospitalApi