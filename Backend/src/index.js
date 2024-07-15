import dotenv from "dotenv"
import connectDb from './db/index.js'

dotenv.config({
    path:"./.env"
})

connectDb();











/* Not a good aproach as file becomes complex,not modular,for modular approach we write code in separate file and execute it..in db
const express = require('express')
const app = express()
require('dotenv')


//iife..immediate execution

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) //await because it takes timme to connect database
        app.on("Error:",(error)=>{
            console.log("Error related to.... express cannot talk with db" ,error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening to port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error occured : ",error);
        throw error;
    }
})()
*/