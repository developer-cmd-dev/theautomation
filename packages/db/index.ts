import mongoose from "mongoose";
import 'dotenv/config'


const dbUrl = process.env.DATABASE_URL  as string;



export async function connectDb (){
    try {
    const result =  await mongoose.connect("");
    
        
    } catch (error) {
        console.log(error)
    }
}
