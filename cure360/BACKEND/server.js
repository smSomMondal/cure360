import express from 'express'
import cors from 'cors'

import userApi from './route/user.js'
import patientApi from './route/patient.js'
import doctorApi from './route/doctor.js'
import pathologyApi from './route/pathology.js'
import hospitalApi from './route/hospital.js'

import './mongo.connect.js'
const app=express()
app.use(express.json())
app.use(cors())



app.use('/user',userApi)
app.use('/patient',patientApi)
app.use('/doctor',doctorApi)
app.use('/pathology',pathologyApi)
app.use('/hospital',hospitalApi)

app.listen(5000,()=>{console.log("server running...")})
