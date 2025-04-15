import express from 'express'
import { addDoctor,getDoctor} from '../controller/doctorCon.js'
import {chqProtectedUser} from '../middleware/chqUser.js'

const doctorApi = express.Router()

doctorApi.post('/add',chqProtectedUser,addDoctor)
doctorApi.post('/docList',getDoctor)
/*doctorApi.put('/checkList',signin)
doctorApi.put('/approve',forgotPassword)
doctorApi.put('/cancel',forgotPassword)
doctorApi.put('/joinMeet',forgotPassword)
doctorApi.put('/sendReport',forgotPassword)
doctorApi.put('/reportUpload',forgotPassword)

//<--------------user---------------------->
doctorApi.post('/avalilableDoctor',signin)
doctorApi.post('/bookCheckup',signin)
doctorApi.post('/reportDownload',signin)*/

export default doctorApi 
