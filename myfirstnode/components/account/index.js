const express=require('express')
const{getAllAccounts,getAccountById,createAccount,deleteAccount,updateAccount,deposit,withdraw} = require('./controller/account')

const accountRouter = express.Router()

accountRouter.get('/',getAllAccounts)
accountRouter.get('/:id',getAccountById)
accountRouter.post('/',createAccount)
accountRouter.delete('/:id',deleteAccount)
accountRouter.put('/:id',updateAccount)
accountRouter.post("/:id/deposit/:bank_id/bankid", deposit)
accountRouter.post("/:id/withdraw/:bank_id/bankid",withdraw)
module.exports = accountRouter