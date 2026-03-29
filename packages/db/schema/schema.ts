import { password } from "bun";
import mongoose, {
    Mongoose,
    Schema, model
} from "mongoose";



const UserSchema = new Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true,unique:true },
    workflows:[{type:mongoose.Schema.Types.ObjectId,ref:"Workflow"}],
    geminiCredential:{type:mongoose.Schema.Types.ObjectId,ref:"GeminiCredential"}
}, { timestamps: true });


const WorkflowSchema = new Schema({
    name: { type: String, require: true },
    connections: { type: Array },
    nodes: { type: Object },
    credentials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Credentials" }],
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    isActive:{type:Boolean,default:false}
}, {
    timestamps: true
})


const CredentialSchema = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    data: { type: Schema.Types.Mixed },
    apiKey:{type:String},
    workflowId: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow" }
}, { timestamps: true })


const GeminiCredentialSchema = new Schema({
    accountName:{type:String,require:true},
    apiKey:{type:String,require:true},
    isActive:{type:Boolean,default:false},
    isExpired:{type:Boolean,default:false},
    models:[{type:Schema.Types.Mixed}],
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    credentialId:{type:mongoose.Schema.Types.ObjectId,ref:"Credentials"}
},{timestamps:true})


const FileUploadSchema = new Schema({
    fileName:{type:String,require:true},
    fileUrl:{type:String,require:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})


const UserModel = model('User', UserSchema)
const WorkflowModel = model("Workflow", WorkflowSchema)
const CredentialsModel = model("Credentials", CredentialSchema);
const GeminiCredentialModel = model("GeminiCredential",GeminiCredentialSchema);
const FileUploadModel = model("FileUpload",FileUploadSchema)
export { UserModel, WorkflowModel, CredentialsModel,mongoose,GeminiCredentialModel,FileUploadModel};
