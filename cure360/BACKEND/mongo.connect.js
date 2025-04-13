import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(`${process.env.DB_URL}`)
    .then(()=>{console.log("db connected")
    }).catch((e)=>{console.log("error massagr",e);
    })