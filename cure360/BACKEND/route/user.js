import express from 'express'
import { forgotPassword, signin, signup } from '../controller/userCon.js'

const userApi = express.Router()

userApi.post('/signup',signup)
userApi.put('/login',signin)
userApi.put('/forgotPassword',forgotPassword)

export default userApi