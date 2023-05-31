const db = require('../../../models/index')
const { StatusCodes } = require('http-status-codes')
const {
    getAllTransactions: getAllTransactionService, deposit: depositTransactionService,deposit:depositAccountService,withdraw:withdrawTransactionService,withdraw:withdrawAccountService
} = require('../service/transaction')

const getAllTransactions = async (req, resp) => {
    //validation => kuch nahi
    try {

        let allTransactions = await getAllTransactionService()
        if (!allTransactions) {
            resp.status(StatusCodes.NOT_FOUND).json({ message: "no recoed found" })
            return
        }
        resp.status(StatusCodes.OK).json(allTransactions)

    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

}



const withdraw = async (req, resp) => {
    try {
        let tid = req.body.tid;
        let amount = req.body.amount;
        let status = req.body.status;
        let senderAccID = req.body.sender_accid;
        let reciverAccID = req.body.reciver_acc_id
        
        let accountAmount = req.body.amount

        //validations
        if (!tid || !amount || !status || !senderAccID || !reciverAccID) {
            resp.status(StatusCodes.BAD_REQUEST).json({
                error: "invalid input"
            })
            if (!amount >= 1000) {
                resp.status(StatusCodes.BAD_REQUEST).json({
                    error: "amount should be > = 1000"
                })
            }
            if(amount >1000){
               let accountAmount = accountAmount - amount
            }
            let deposit = await withdrawTransactionService(tid, amount, status, senderAccID, reciverAccID)
            resp.status(StatusCodes.CREATED).json(deposit)

            let accountAfterWithdraw = await withdrawAccountService(accountAmount)
            resp.status(StatusCodes.OK).json(accountAfterWithdraw)
            
        }


    } catch (error) {
        resp.status(StatusCodes.BAD_REQUEST).json(error)
    }
}
module.exports = {
    getAllTransactions,withdraw
}