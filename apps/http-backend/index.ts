import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import router from './src/routes/router.js';
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express';

const app = express();
app.use(express.json())
app.use(cors())

const dbUrl = process.env.MONGODB_URL as string;
app.use(clerkMiddleware())

app.use('/api/v1',router)



mongoose.connect(dbUrl).then(()=>{
    console.log('db connected')
    app.listen(8080,(error)=>{
        if(error){
            console.log(error);
            return;
        }
        console.log('Server is listening on 8080')
    })
}).catch((error)=>{
    console.log(error)
})






