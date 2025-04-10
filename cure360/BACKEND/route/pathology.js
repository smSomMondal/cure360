import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const pathologyApi = express.Router()

pathologyApi.post('/add',signup)
pathologyApi.put('/listServise',signin)
pathologyApi.put('/reportSend',forgotPassword)

export default pathologyApi