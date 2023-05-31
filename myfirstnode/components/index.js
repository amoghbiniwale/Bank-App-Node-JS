const express = require('express')
const router = express.Router()
const bankRouter = require('./bank')
const userRouter = require('./User')
const accountRouter = require('./account')
const transactionRouter = require('./transaction')



router.use('/bank',bankRouter)
router.use('/user',userRouter)
router.use('/account',accountRouter)
router.use('/transaction',transactionRouter)
module.exports = router






