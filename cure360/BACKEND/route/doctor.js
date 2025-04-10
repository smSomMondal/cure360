import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const doctorApi = express.Router()

doctorApi.post('/add',signup)
doctorApi.put('/checkList',signin)
doctorApi.put('/approve',forgotPassword)
doctorApi.put('/cancel',forgotPassword)
doctorApi.put('/joinMeet',forgotPassword)
doctorApi.put('/sendReport',forgotPassword)

export default doctorApi