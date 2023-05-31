const router = require('./components')
const db = require("./models")
const express = require('express')
const app = express()
app.use(express.json())
app.use('/api/v1/firstapp',router)

const startApp =( )=>{
    let port = 4000
    app.listen(port,console.log(`Server started at ${port}`))
}

startApp()