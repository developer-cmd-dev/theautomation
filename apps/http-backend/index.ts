import UserModel from '@repo/db/schema';
import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"


const app = express();
app.use(express.json())

const dbUrl = process.env.MONGODB_URL as string;

app.post('/signup', async(req,res)=>{
    const body =<{name:string,email:string,password:string}> req.body;
    console.log(body)
    try {
      const result = await  UserModel.create(body);
      console.log(result);

      res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }

})



mongoose.connect(dbUrl).then(()=>{
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






