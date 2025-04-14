import express from 'express'
import { registerUser,authUser,updateUser } from '../controller/userCon.js'

const userApi = express.Router()

userApi.post('/signup',registerUser)
userApi.put('/login',authUser)
userApi.put('/forgotPassword',updateUser)

export default userApi