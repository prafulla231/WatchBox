import mongoose from 'mongoose'
import dotenv from "dotenv"
import express from "express"
const app = express();
import { DB_NAME } from '../constants.js';

dotenv.config({
    path:"./.env"
})

const connectDb = async()=>{
    try {
        // console.log("mongo db url",process.env.MONGODB_URL);
        // console.log(DB_NAME);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) //mongoose returns an object
        console.log(`\n MongoDB connected successfully !!!! DB Host : ${connectionInstance.connection.host}`);
        // app.on("error",(err)=>{
        //     console.log("error of express while talking to DB ",err);
        //     throw err;
        // })

        // app.listen(process.env.PORT,()=>{
        //     console.log(`App is listening on port ; ${process.env.PORT}`);
        // })
        
    } catch (error) {
        console.log("MONGODB connection Failed : ",error);
        // throw error;//this also works bu node js gives access of process so it handles it 
        process.exit(1)
    }
}

export default connectDb