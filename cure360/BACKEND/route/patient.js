import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const patientApi = express.Router()

patientApi.post('/add',signup)
patientApi.put('/bookDoctor',signin)
patientApi.put('/bookhospital',signin)
patientApi.put('/bookTest',forgotPassword)
patientApi.put('/pastBilling',forgotPassword)
patientApi.put('/doctorHistory',forgotPassword)
patientApi.put('/upcommingAppointment',forgotPassword)
patientApi.put('/upcommingTest',forgotPassword)

export default patientApi