const { where } = require('sequelize');
const db = require('../../../models/index')

const getAllAccounts = async () => {
    //logic to fetch all accounts
    try {
        console.log(">>>>>>>>>getallaccounts service started>>>>>>>>");
        const allAccounts = await db.account.findAll()
        console.log(">>>>>>>>>getallaccounts service ended>>>>>>>>");
        return allAccounts
    } catch (error) {
        throw error
    }
}

const getAccountById = async (isSendByController) => {
    //logic to fetch bank by id
    try {
        const account = await db.account.findOne(
            {
                where: {
                    id: isSendByController
                }
            }

        )
        return account
    } catch (error) {
        throw error
    }
}

const updateAccount = async (id, accountNo, amount, isActive, bankId, customerId) => {
    try {
        const updateAccount = await db.account.update(
            {
                account_no: accountNo,
                amount: amount,
                is_active: isActive,
                bank_id: bankId,
                customer_id: customerId
            },
            {
                where: {
                    id: id
                }
            }
        );
        return updateAccount
    } catch (error) {
        throw error
    }
}

const createAccount = async (accountNo, amount, isActive, bankId, customerId) => {
    try {
        newAccount = await db.account.create({
            account_no: accountNo,
            amount: amount,
            is_active: isActive,
            bank_id: bankId,
            customer_id: customerId

        })
        return newAccount
    } catch (error) {
        throw error
    }
}

const deposit = async (id,bankId,amount, t) => {
    try {
        account = await db.account.increment(
            {
                'amount': amount
            },
            {
                where: {
                    id: id,
                    bank_id:bankId
                }
            },{
                transaction:t
            }
        )
    } catch (error) {
        throw error
    }
}

const withdraw = async (id,bankId,amount ,t) => {
    try {
        account = await db.account.decrement(
            {
                'amount': amount
            },
            {
                where: {
                    id: id,
                    bank_id:bankId
                }
            },{
                transaction:t
            }
        )
    } catch (error) {
        throw error
    }
}
const deleteAccount = async (isSendByController) => {
    try {
        const deleteAccountById = await db.account.destroy(
            {
                where: {
                    id: isSendByController
                }
            }
        )
        return deleteAccountById
    } catch (error) {
        throw error
    }
}
module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    deleteAccount,
    updateAccount,
    deposit,withdraw
}