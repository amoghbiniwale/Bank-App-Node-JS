const { where } = require('sequelize');
const db = require('../../../models/index')

const getAllBanks = async () => {
    //logic to fetch all banks
    try {
        console.log(">>>>>>>>>getallbanks service started>>>>>>>>");
        const allBanks = await db.bank.findAll()
        console.log(">>>>>>>>>getallbanks service ended>>>>>>>>");
        return allBanks
    } catch (error) {
        throw error
    }
}

const getBankById = async (isSendByController) => {
    //logic to fetch bank by id
    try {
        const bank = await db.bank.findOne(
            {
                where: {
                    id: isSendByController
                }
            }

        )
        return bank
    } catch (error) {
        throw error
    }  
}

const getAccountsByBankId = async (id)=>{
    try {
        const accounts = await db.account.findAll(
            {
                where: {
                    bank_id:id 
                }
            }

        )
        return accounts
    } catch (error) {
        throw error
    }
}

const deleteBank = async(isSendByController) => {
    try {
        const deleteBankById = await db.bank.destroy(
            {
                where: {
                    id:isSendByController
                }
            }
        )
        return deleteBankById
    } catch (error) {
        throw error
    }
}


const createBank = async (nameFromController, abbrvFromController,t) => {
    try {
        newBank = await db.bank.create({
            name: nameFromController,
            abbrv: abbrvFromController
        },{
            transaction:t
        })
        return newBank
    } catch (error) {
        throw error
    }
}

const updateBank = async (id,nameFromController,abbrvFromController) =>{
    console.log("ser started");
    try {
        console.log("ser------>");
        const updateBankByid = await db.bank.update({
            name : nameFromController,
            abbrv:abbrvFromController
        },
        {
            where: {
              id: id
            }
          }
        );
        console.log(updateBankByid);
        return updateBankByid
    } catch (error) {
        throw error
    }
    
}

module.exports = {
    getAllBanks,
    getBankById,
    createBank,
    updateBank,
    deleteBank,
    getAccountsByBankId
}