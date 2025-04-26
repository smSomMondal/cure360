import express from 'express'
import { addDoctor,getDoctor,appointList,approvedAppointment, appointCancel} from '../controller/doctorCon.js'
import {chqProtectedUser} from '../middleware/chqUser.js'

const doctorApi = express.Router()

doctorApi.post('/add',chqProtectedUser,addDoctor)
doctorApi.post('/docList',getDoctor)
doctorApi.put('/checkList',appointList)
doctorApi.put('/approve',approvedAppointment)
doctorApi.put('/cancel',appointCancel)
/*doctorApi.put('/joinMeet',forgotPassword)
doctorApi.put('/sendReport',forgotPassword)
doctorApi.put('/reportUpload',forgotPassword)

//<--------------user---------------------->
doctorApi.post('/avalilableDoctor',signin)
doctorApi.post('/bookCheckup',signin)
doctorApi.post('/reportDownload',signin)*/

export default doctorApi 
