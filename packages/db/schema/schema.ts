import { password } from "bun";
import mongoose, {
    Mongoose,
    Schema,model
} from "mongoose";



const UserSchema = new Schema({
    name:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String,require:true},
},{timestamps:true});


const WorkflowSchema = new Schema({
    name:{type:String,require:true},
    connections:{type:Array},
    nodes:{type:Object},
    credentials:[{type:mongoose.Schema.Types.ObjectId,ref:"Credentials"}]
},{
    timestamps:true
})


const CredentialSchema = new Schema({
    name:{type:String,require:true},
    type:{type:String,require:true},
    data:{type:Schema.Types.Mixed},
    workflowId:{type:mongoose.Schema.Types.ObjectId,ref:"Workflow"}
},{timestamps:true})

CredentialSchema.pre("findOneAndDelete",async function (doc) {
    if(doc){
        await mongoose.model("Workflow").updateOne(
            {credentials:doc._id},
            {$pull:{credentials:doc._id}}
        )
    }
})

const UserModel = model('User',UserSchema)
const WorkflowModel= model("Workflow",WorkflowSchema)
const CredentialsModel = model("Credentials",CredentialSchema)
export {UserModel,WorkflowModel,CredentialsModel};
