import express from 'express';
import "dotenv/config"
import router from './src/routes/router.js';
import cors from 'cors'
import mongoose from 'mongoose'
const app = express();
app.use(express.json())
app.use(cors())

const dbUrl = process.env.MONGODB_URL as string;

app.use('/api/v1',router)

mongoose.connect(dbUrl).then(state=>{
    if(state.connection.readyState===1){
        app.listen(8080,(error)=>{
            if(error){
                console.log(error);
                return;
            }
            console.log('Server is listening on port 8080');
        })
    }

}).catch(error=>{
    console.log(error)
})








