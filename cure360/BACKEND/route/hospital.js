import express from 'express'
import { chqProtectedUser, chqProtectedHospital } from '../middleware/chqUser.js'
import {addHospital, addMultipleBedsToHospital, updateMultipleBedNumbers, updateHospitalStatus, getBedsByLocation ,updateBedInfo, hosInfo} from '../controller/hospitaCon.js'

const hospitalApi = express.Router()

hospitalApi.post('/add',chqProtectedUser,addHospital)
hospitalApi.post('/addBed',chqProtectedHospital,addMultipleBedsToHospital)
hospitalApi.post('/updateBedAvality',chqProtectedHospital,updateMultipleBedNumbers)
hospitalApi.post('/updateStatus',chqProtectedHospital,updateHospitalStatus)
hospitalApi.post('/:hospitalId/bedinfo',updateBedInfo)
hospitalApi.post('/hosData',chqProtectedHospital,hosInfo)

//<----------------user------------------------>
hospitalApi.post('/checkAvility',chqProtectedHospital,getBedsByLocation)

export default hospitalApi