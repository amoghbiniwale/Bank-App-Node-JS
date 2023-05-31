const express = require('express')
const { getAllBanks,getBankById,createBank,updateBank,deleteBank,getAccountsByBankId } = require('./controller/bank')

const bankRouter = express.Router()

bankRouter.get('/:id/accounts',getAccountsByBankId)
bankRouter.get('/',getAllBanks)
bankRouter.get('/:id',getBankById)
bankRouter.post('/',createBank)
bankRouter.put('/:id',updateBank)
bankRouter.delete('/:id',deleteBank)
module.exports = bankRouter

//bankRouter => 'api/v1/firstapp/bank/'