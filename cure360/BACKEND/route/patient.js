import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const patientApi = express.Router()

patientApi.post('/add',signup)
patientApi.put('/bookDoctor',signin)
patientApi.put('/bookTest',forgotPassword)

export default patientApi