import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(`mongodb+srv://somforapi:${process.env.DB_Pass}@cluster0.y12hg3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>{console.log("db connected")
    }).catch((e)=>{console.log("error massagr",e);
    })