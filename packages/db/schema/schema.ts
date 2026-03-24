import { password } from "bun";
import {
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
    nodes:{type:Object}
},{
    timestamps:true
})


const UserModel = model('User',UserSchema)
const WorkflowModel= model("Workflow",WorkflowSchema)
export {UserModel,WorkflowModel};
