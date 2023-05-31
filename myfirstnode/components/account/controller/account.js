const db = require('../../../models/index')
const { StatusCodes } = require('http-status-codes')

const {
    getAllAccounts: getAllAccountsService,
    getAccountById: getAccountByIdService,
    createAccount: createAccountService,
    deleteAccount: deleteBankByIdService,
    updateAccount: updateAccountIdService,
    deposit:depositAccountService,
    withdraw:withdrawAccountService
} = require('../service/account')

const getAllAccounts = async (req, resp) => {
    //validations

    try {
        let allAccounts = await getAllAccountsService()
        if (!allAccounts) {
            resp.status(StatusCodes.NOT_FOUND).json({ message: "no recoed found" })
            return
        }
        resp.status(StatusCodes.OK).json({ allAccounts })

    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

const getAccountById = async (req, resp) => {
    try {
        let id = req.params.id
        id = parseInt(id)
        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const account = await getAccountByIdService(id)
        if (!account) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No account Found" })
        }
        resp.status(StatusCodes.OK).json(account)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return
    }
}
const updateAccount = async (req, resp) => {
    try {
        let id = req.params.id
        id = parseInt(id)
        let accountNo = req.body.account_no
        let amount = req.body.amount
        let isActive = req.body.is_active
        let bankId = req.body.bank_id
        let customerId = req.body.customer_id
        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const account = await updateAccountIdService(id, accountNo, amount, isActive, bankId, customerId)
        if (!account) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No account Found" })
        }
        resp.status(StatusCodes.OK).json(account)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return
    }
}
const createAccount = async (req, resp) => {
    console.log("create account started===>");
    const t = await db.sequelize.transaction();
    try {
        console.log("create account--->");
        let accountNo = req.body.account_no;
        let amount = req.body.amount
        let isActive = req.body.is_active
        let bankId = req.body.bank_id
        let customerId = req.body.customer_id
        console.log(" accountNo ", accountNo, "amount", amount, " isActive ", isActive, " bankId ", bankId, " customerId ", customerId)
        //validations
        if (!accountNo || !amount || !isActive || !bankId || !customerId) {
            resp.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid inputs"
            })
        }

        let newAccount = await createAccountService(accountNo, amount, isActive, bankId, customerId, t)
        resp.status(StatusCodes.CREATED).json(newAccount)
        t.commit()
    } catch (error) {
        t.rollback();
        resp.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

const deposit = async (req, resp, next) => {
    const t = await db.sequelize.transaction()

    try {
        let amount = req.body.amount;
        let bankId = req.params.bank_id;
        let id = req.params.id

        let newDeposit = await depositAccountService(id,bankId,amount,t)
       // console.log(t);
        await t.commit();
        
        resp.status(StatusCodes.CREATED).json(newDeposit)
        
       
    } catch (error) {
        //await t.rollback();
        console.error(error);
        next(error)
    }
}

const withdraw = async (req, resp, next) => {
    const t =await db.sequelize.transaction()

    try {
        let amount = req.body.amount;
        let bankId = req.params.bank_id;
        let id = req.params.id

        let newWithdraw = await withdrawAccountService(id,bankId,amount,t)
        resp.status(StatusCodes.CREATED).json(newWithdraw)
        t.commit();
    } catch (error) {
        t.rollback()
        console.error(error);
        next(error)
    }
}
const deleteAccount = async (req, resp) => {
    console.log("create account started===>");
    try {
        console.log("create account--->");
        let id = req.params.id
        id = parseInt(id)
        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const deleteAccount = await deleteBankByIdService(id)
        if (!account) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No account Found" })
        } resp.status(StatusCodes.OK).json(account)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return
    }
}



module.exports = {
    getAllAccounts, getAccountById, createAccount, deleteAccount, updateAccount, deposit,withdraw
}