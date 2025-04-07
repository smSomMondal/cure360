import mongoose from 'mongoose'

mongoose.connect(`mongodb+srv://somforapi:******@cluster0.y12hg3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>{console.log("db connected")
    }).catch((e)=>{console.log("error massagr",e);
    })