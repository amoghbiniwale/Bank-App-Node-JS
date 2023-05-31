const express = require('express')
const {getAllUser,getUserById,createUser,deleteUser,getAccountsByUserId,updateUser,createAccount} = require('./controller/user')
const {login,verifyToken} = require ('../auth')
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const secretKey ="secretKey"

userRouter.put('/:id',updateUser)
userRouter.get('/:id/accounts',getAccountsByUserId)
userRouter.get('/',getAllUser) 
userRouter.get('/:id',getUserById)
userRouter.post('/',createUser)
userRouter.delete('/:id',deleteUser)

userRouter.post('/:id/createaccount',createAccount)

module.exports = userRouter

userRouter.post('/login',login)


userRouter.post('/profile',verifyToken)




