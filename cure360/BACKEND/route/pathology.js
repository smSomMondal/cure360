import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const pathologyApi = express.Router()

pathologyApi.post('/add',signup)
pathologyApi.put('/listServisBook',signin)
pathologyApi.put('/accept',signin)
pathologyApi.put('/cancel',signin)
pathologyApi.put('/reportUpload',forgotPassword)

//<------------------user---------------------->
pathologyApi.post('/avilavleService',signin)
pathologyApi.post('/bookTest',signin)
pathologyApi.post('/reportDownload',signin)

export default pathologyApi