import express from 'express'
import { chqProtectedUser, chqProtectedHospital } from '../middleware/chqUser.js'
import {addHospital, addMultipleBedsToHospital, updateMultipleBedNumbers, updateHospitalStatus, getBedsByLocation} from '../controller/hospitaCon.js'

const hospitalApi = express.Router()

hospitalApi.post('/add',chqProtectedUser,addHospital)
hospitalApi.post('/addBed',chqProtectedHospital,addMultipleBedsToHospital)
hospitalApi.post('/updateBedAvality',chqProtectedHospital,updateMultipleBedNumbers)
hospitalApi.post('/updateStatus',chqProtectedHospital,updateHospitalStatus)

//<----------------user------------------------>
hospitalApi.post('/checkAvility',chqProtectedHospital,getBedsByLocation)

export default hospitalApi