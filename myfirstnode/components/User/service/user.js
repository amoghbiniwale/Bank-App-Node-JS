const { where } = require('sequelize');
const db = require('../../../models/index');

const getAllUser = async () => {
    try {
        console.log(">>>>>>>>>getallUser service started>>>>>>>>");
        const allUser = await db.user.findAll();
        console.log(">>>>>>>>>getallUser service ended>>>>>>>>");
        return allUser;
    } catch (error) {
        throw error
    }

}

const getAccountsByUserId = async (id) => {
    try {
        const accounts = await db.account.findAll(
            {
                where: {
                    customer_id: id
                }
            }

        )
        return accounts
    } catch (error) {
        throw error
    }
}

const updateUser = async (id, userId, email, firstName, isActive, lastName, password, role) => {
    try {
        const updateUserById = await db.user.update(
            {
                user_id: userId,
                email: email,
                first_name: firstName,
                is_active: isActive,
                last_name: lastName,
                password: password,
                role: role
            },
            {
                where: {
                    id: id
                }

            }
        )
        return updateUserById
    } catch (error) {
        throw error
    }
}

const getUserById = async (isSendByController) => {
    //logic to fetch user by id
    try {
        const user = await db.user.findOne(
            {
                where: {
                    id: isSendByController
                }
            }

        )
        return user
    } catch (error) {
        throw error
    }
}

const login = async(email)=>{
    try {
        const user = await db.user.findOne(
            {
                where: {
                    email: email
                }
            }

        )
        return user
    } catch (error) {
        throw error
    }
}

const createUser = async (userIdFromController, emailFromController, firstNameFromController, isActiveFromController, lastNameFromController, passwordFromController, roleFromController) => {
    try {
        newUser = await db.user.create({
            user_id: userIdFromController,
            email: emailFromController,
            first_name: firstNameFromController,
            is_active: isActiveFromController,
            last_name: lastNameFromController,
            password: passwordFromController,
            role: roleFromController
        })
        return newUser
    } catch (error) {
        throw error
    }
}

const createAccount = async (id,accountNo, amount, isActive, bankId, customerId)=>{
    try {
        newAccount = await db.account.create({
            account_no: accountNo,
            amount: amount,
            is_active: isActive,
            bank_id: bankId,
            customer_id: customerId
        },{ 
            where: {
                id: id
            },
            
        })
    } catch (error) {
        
    }
}

const deleteUser = async (isSendByController) => {
    try {
        const deleteUserById = await db.user.destroy(
            {
                where: {
                    id: isSendByController
                }
            }
        )
        return deleteUserById
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    deleteUser,
    getAccountsByUserId,
    updateUser,
    createAccount,login
}