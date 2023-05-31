const db = require('../../../models/index')
const { StatusCodes } = require("http-status-codes")
//const { json } = require("sequelize")
const {
    getAllUser: getAllUserService, getUserById: getUserByIdService, createUser: createUserService, deleteUser: deleteUserByIdService, getAccountsByUserId: getAccountsByUserIdService, updateUser: updateUserByIdService,
    createAccount:createAccountService
} = require("../service/user")


const getAllUser = async (req, resp) => {
    //no validations 
    try {
        console.log(">>>>>>>>>getalluser controller Started>>>>>>>>");
        let allUser = await getAllUserService()
        if (!allUser) {

            resp.this.status(404).json({ message: "No record found" })
            return
        }
        if (!allUser) {
            resp.status(StatusCodes.NOT_FOUND).json({ message: "no record found" })
        }
        if (allUser) {
            resp.status(StatusCodes.OK).json(allUser)
        }
        console.log(">>>>>>>>>getallbanks controller Ended>>>>>>>>");
    } catch (error) {

    }
}

const getUserById = async (req, resp) => {
    try {
        let id = req.params.id
        console.log("--------->", id);
        id = parseInt(id)

        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const user = await getUserByIdService(id)
        if (!user) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No user Found" })
        }
        resp.status(StatusCodes.OK).json(user)
    } catch (error) {
        resp.status(StatusCodes.NOT_FOUND).json({ error: "No user Found" })
    }
}

const updateUser = async (req, resp) => {
    try {
        let id = req.params.id
        console.log("--------->", id);
        id = parseInt(id)
        let userId = req.body.user_id
        let email = req.body.email
        let firstName = req.body.first_name
        let isActive = req.body.is_active
        let lastName = req.body.last_name
        let password = req.body.password
        let role = req.body.role
        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const user = await updateUserByIdService(id, userId, email, firstName, isActive, lastName, password, role)
        if (!user) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No user Found" })
        }
        resp.status(StatusCodes.OK).json(user)
        console.log("id", id, "user_id", userId, "email", email, "firstName", firstName, "isActive", isActive, "lastname", lastName, "password", password, "role", role);
    } catch (error) {
        resp.status(StatusCodes.NOT_FOUND).json({ error: "No user Found" })
    }
}

const getAccountsByUserId = async (req, resp) => {
    try {
        let id = req.params.id
        id = parseInt(id)
        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const accounts = await getAccountsByUserIdService(id)
        if (!accounts) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No User FOund" })
        }
        resp.status(StatusCodes.OK).json(accounts)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return
    }
}

const deleteUser = async (req, resp) => {
    try {
        let id = req.params.id
        id = parseInt(id)

        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        const user = await deleteUserByIdService(id)
        if (!user) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No user Found" })
        }
        resp.status(StatusCodes.OK).json(user)
    } catch (error) {
        resp.status(StatusCodes.NOT_FOUND).json({ error: "No user Found" })
    }
}

const createAccount = async  (req, resp) => {
    try {
        let id = req.params.id
        id = parseInt(id)
        if (!id || typeof id == NaN) {
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid id" })
            return
        }
        console.log("create account--->");
        let accountNo = req.body.account_no;
        let amount = req.body.amount
        let isActive = req.body.is_active
        let bankId = req.body.bank_id
        let customerId = req.body.customer_id
        console.log("id",id," accountNo ", accountNo, "amount", amount, " isActive ", isActive, " bankId ", bankId, " customerId ", customerId)
        //validations
        if (!accountNo || !amount || !isActive || !bankId || !customerId) {
            resp.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid inputs"
            })
        }
        let newAccount =  await createAccountService(id,accountNo, amount, isActive, bankId, customerId)
        resp.status(StatusCodes.CREATED).json(newAccount)
    } catch (error) {
        resp.status(StatusCodes.BAD_REQUEST).json(error)
    }
}


const createUser = async (req, resp) => {
    console.log("create user started=====>");
    const t = await db.sequelize.transaction();
    try {
        console.log("create user===>");

        let user_id = req.body.user_id
        let email = req.body.email
        let first_name = req.body.first_name
        let is_active = req.body.is_active
        let last_name = req.body.last_name
        let password = req.body.password
        let role = req.body.role

        console.log("user_id", user_id, "email", email, " first_name ", first_name, " is_active ", is_active, " last_name ", last_name, " password ", password, " role ", role)

        //validations
        if (!user_id || !email || !first_name || !is_active || !last_name || !password || !role) {
            resp.status(StatusCodes.BAD_REQUEST).json({
                error: "Invalid inputs"
            })
        }
        let newUser = await createUserService(user_id, email, first_name, is_active, last_name, password, role)
        resp.status(StatusCodes.CREATED).json(newUser)
        t.commit();
    } catch (error) {
        t.rollback();
        resp.status(StatusCodes.BAD_REQUEST).json(error)
    }

}


module.exports = {
    getAllUser,
    getUserById,
    createUser,
    deleteUser,
    getAccountsByUserId,
    updateUser,
    createAccount
}