const db = require('../../../models/index')

const getAllTransactions = async () => {
    //logic to fetch all banks
    try {
        const allTransaction = await db.transaction.findAll()
        return allTransaction
    } catch (error) {
        throw error
    }
}

const deposit = async (tid,amount,status,senderAccID,reciverAccID,tran) => {
    try {

        depositAmount = await db.transaction.create({
            tid:tid,
            amount:amount,
            status:status,
            sender_acc_id:senderAccID,
            reciver_acc_id:reciverAccID

        },{
            transaction:tran
        })
        return depositAmount
    } catch (error) {
        throw error
    }
}

const depositAccount = async (amount,tran)=>{
    try {
        depositAmountInAccount = await db.account.increment({
            amount:amount
        },{
            transaction:tran
        })
    } catch (error) {
        throw error
    }
}

const withdraw = async (tid,amount,status,senderAccID,reciverAccID)=>{
    try {

        depositAmount = await db.transaction.create({
            tid:tid,
            amount:amount,
            status:status,
            sender_acc_id:senderAccID,
            reciver_acc_id:reciverAccID

        })
        return depositAmount
    } catch (error) {
        throw error
    }
}

const withdrawAccount = async (amount)=>{
    try {
        withdrawAmountInAccount = await db.account.create({
            amount:amount
        })
    } catch (error) {
        throw error
    }
} 
module.exports = {
    getAllTransactions,
    deposit,
    depositAccount,withdraw,withdrawAccount
}