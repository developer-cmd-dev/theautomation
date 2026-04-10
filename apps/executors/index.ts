import mongoose from "mongoose";
import "dotenv/config";
import { UserModel } from "@repo/db/client";

const dbUrl = process.env.MONGODB_URL ?? "";
console.log(dbUrl)



async function main() {

    
    
}






mongoose.connect(dbUrl)
.then(state=>{
    if(state.connection.readyState===1){
        console.log('db connected')
        main()
    }
}).catch(error=>{
    console.log(error)
})