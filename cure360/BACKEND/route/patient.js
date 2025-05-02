import express from 'express'
import { addPatient ,addAppointmentRequest ,hospitaAvilibility } from '../controller/patientCon.js'
import{ getDoctor} from '../controller/doctorCon.js'
import {chqProtectedUser,chqProtectedPatient} from '../middleware/chqUser.js'


const patientApi = express.Router()

patientApi.post('/add',chqProtectedUser,addPatient)
patientApi.put('/bookDoctor',chqProtectedPatient,addAppointmentRequest)
patientApi.put('/checkHospital',chqProtectedPatient,hospitaAvilibility)
patientApi.put('/finddoctor',chqProtectedPatient,getDoctor)
/*patientApi.put('/bookTest',forgotPassword)
patientApi.put('/pastBilling',forgotPassword)
patientApi.put('/doctorHistory',forgotPassword)
patientApi.put('/upcommingAppointment',forgotPassword)
patientApi.put('/upcommingTest',forgotPassword)*/

export default patientApi