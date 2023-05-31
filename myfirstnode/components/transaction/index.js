const express = require('express')
const transactionRouter = express.Router()
const {getAllTransactions,deposit,withdraw} = require('./controller/transaction')


transactionRouter.get('/',getAllTransactions)
//transactionRouter.post('/deposit',deposit)
transactionRouter.post('/withdraw',withdraw)
//transactionRouter.get('/:id',getTransactionById)


module.exports = transactionRouter