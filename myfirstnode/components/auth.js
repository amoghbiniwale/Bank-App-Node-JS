const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { json } = require("sequelize");
const secretKey = "secretKey"

const {
    login:getUserByEmailService
}  = require("../components/User/service/user")

const login = async (req, resp) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        //verify email and password
        if(!email || !password){
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid eamil and password" })
            return    
        }
        //find user with email
        const user = await getUserByEmailService(email)
        if(!user){
            resp.status(StatusCodes.BAD_REQUEST).json({ error: "invalid email" })
            return
        }
       
        // const user = {
        //     user_id: 22,
        //     email: "sa@gmail.com",
        //     first_name: "ram",
        //     is_active: 1,
        //     last_name: "sass",
        //     password: 12345,
        //     role: "USER"
        // }
        const token = jwt.sign(JSON.stringify(user), secretKey);
        resp.status(StatusCodes.CREATED).json(token)

    } catch (error) {
        resp.status(StatusCodes.BAD_REQUEST).json(error)
    }
}
function verifyToken(req, resp) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        const payload = jwt.verify(token, secretKey)
        if (!payload) {
            resp.status(StatusCodes.UNAUTHORIZED).json({ message: "unauthorized token" })
            return

        } if (payload.role = "USER") {

        }
        resp.status(StatusCodes.CREATED).json({ message: " successful" })

    } else {
        resp.send({
            result: "Token is not valid"
        })
    }

}
module.exports = { login, verifyToken }