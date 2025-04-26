import express from 'express'
import {addHospital, addMultipleBedsToHospital, updateMultipleBedNumbers, updateHospitalStatus, getBedsByLocation} from '../controller/hospitaCon.js'

const hospitalApi = express.Router()

hospitalApi.post('/add',addHospital)
hospitalApi.post('/addBed',addMultipleBedsToHospital)
hospitalApi.post('/updateBedAvality',updateMultipleBedNumbers)
hospitalApi.post('/updateStatus',updateHospitalStatus)

//<----------------user------------------------>
hospitalApi.post('/checkAvility',getBedsByLocation)

export default hospitalApi