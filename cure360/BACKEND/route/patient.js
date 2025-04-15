import express from 'express'
import { addPatient ,addAppointmentRequest } from '../controller/patientCon.js'
import {chqProtectedUser} from '../middleware/chqUser.js'


const patientApi = express.Router()

patientApi.post('/add',chqProtectedUser,addPatient)
patientApi.put('/bookDoctor',addAppointmentRequest)
/*patientApi.put('/bookhospital',addPatient)
patientApi.put('/bookTest',forgotPassword)
patientApi.put('/pastBilling',forgotPassword)
patientApi.put('/doctorHistory',forgotPassword)
patientApi.put('/upcommingAppointment',forgotPassword)
patientApi.put('/upcommingTest',forgotPassword)*/

export default patientApi