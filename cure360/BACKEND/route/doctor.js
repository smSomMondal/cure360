import express from 'express'
import { addDoctor,getDoctor,appointList,approvedAppointment,appointCantList} from '../controller/doctorCon.js'
import {chqProtectedUser , chqProtectedDoctor} from '../middleware/chqUser.js'

const doctorApi = express.Router()

doctorApi.post('/add',chqProtectedUser,addDoctor)
doctorApi.post('/docList',chqProtectedDoctor,getDoctor)
doctorApi.put('/checkList',chqProtectedDoctor,appointList)
doctorApi.put('/approve',chqProtectedDoctor,approvedAppointment)
doctorApi.put('/cancel',chqProtectedDoctor,appointCantList)
/*doctorApi.put('/joinMeet',forgotPassword)
doctorApi.put('/sendReport',forgotPassword)
doctorApi.put('/reportUpload',forgotPassword)

//<--------------user---------------------->
doctorApi.post('/avalilableDoctor',signin)
doctorApi.post('/bookCheckup',signin)
doctorApi.post('/reportDownload',signin)*/

export default doctorApi 
