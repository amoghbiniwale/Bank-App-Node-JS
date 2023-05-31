const db = require('../../../models/index')
const{StatusCodes} = require('http-status-codes')
const{
    getAllBanks : getAllBanksService , getBankById: getBankByIdService, createBank:createBankService,updateBank: updateBankService,deleteBank:deleteBankByIdService,getAccountsByBankId: getAccountsByBankIdService
} = require("../service/bank")

const getAllBanks = async(req,resp)=>{
    //validation => kuch nahi
try{
    console.log(">>>>>>>>>getallbanks controller Started>>>>>>>>");
    let allBanks = await getAllBanksService()
    if(!allBanks){
        resp.status(StatusCodes.NOT_FOUND).json({message:"no recoed found"})
        return
    }
    resp.status(StatusCodes.OK).json(allBanks)
    console.log(">>>>>>>>>getallbanks controller Ended>>>>>>>>");

}catch(error){
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
}
    
}

const getBankById = async (req,resp)=>{
    try {
        let id = req.params.id
        id = parseInt(id)
        if(!id || typeof id == NaN){
            resp.status(StatusCodes.BAD_REQUEST).json({error : "invalid id"})
            return
        }
        const bank = await getBankByIdService(id)
        if (!bank) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No Bank FOund" })
        }
        resp.status(StatusCodes.OK).json(bank)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return 
    }

}

const createBank = async (req, resp) => {
    console.log("create bank started=====>");
    const t = await db.sequelize.transaction();

    try {
        console.log("create bank===>");
        let name = req.body.name
        let abbrv = req.body.abbrv

        console.log("name",name, "abbrv",abbrv)
        //validations
        if(!name || !abbrv){
            resp.status(StatusCodes.BAD_REQUEST).json({
                error:"Invalid Inputs"
            })
        }
        let newBank = await createBankService(name,abbrv,t)

        resp.status(StatusCodes.CREATED).json(newBank)
        t.commit()
    } catch (error) {
        t.rollback();
        resp.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

const updateBank = async(req, resp) => {
    console.log("update bank started");
    
    try {
        console.log("->>>>>>");
            let  id = req.params.id
            id = parseInt(id)
            let name = req.body.name
            let abbrv = req.body.abbrv
            console.log("name",name,"abbrav",abbrv);
            if(!id || typeof id == NaN){
                resp.status(StatusCodes.BAD_REQUEST).json({error : "invalid id"})
                return
            }
            const bank = await updateBankService(id,name,abbrv)
            console.log(bank);
            
        if (!bank) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No Bank FOund" })
            return
        }
        resp.status(StatusCodes.OK).json(bank)
        
    } catch (error) {
        
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return 
    }
}

const deleteBank = async(req,resp)=>{
    try {
        let id = req.params.id
        id = parseInt(id)
        if(!id || typeof id == NaN){
            resp.status(StatusCodes.BAD_REQUEST).json({error : "invalid id"})
            return
        }
        const bank = await deleteBankByIdService(id)
        if (!bank) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No Bank FOund" })
        }
        resp.status(StatusCodes.OK).json(bank)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return 
    }
}

const getAccountsByBankId = async(req,resp)=>{
    try {
        let id = req.params.id
        id = parseInt(id)
        if(!id || typeof id == NaN){
            resp.status(StatusCodes.BAD_REQUEST).json({error : "invalid id"})
            return
        }
        const accounts = await getAccountsByBankIdService(id)
        if (!accounts) {
            resp.status(StatusCodes.NOT_FOUND).json({ error: "No Bank FOund" })
        }
        resp.status(StatusCodes.OK).json(accounts)
    } catch (error) {
        resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        return 
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