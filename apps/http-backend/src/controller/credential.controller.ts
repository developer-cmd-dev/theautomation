import { CreateWorkflowZodSchema, CredentialZodSchema } from "@repo/types/types";
import { type Response, Request } from "express";
import HttpResponse from "../lib/httpResponse.js";
import { CredentialsModel, WorkflowModel } from "@repo/db/schema";



export async function createCredential(req: Request, res: Response) {

    try {

        const { success, data } = CredentialZodSchema.safeParse(req.body);
        if (!success) {
            res.status(404).json(new HttpResponse(false, "Invalid input"))
            return;
        }

        const findWorkflow = await WorkflowModel.findById({_id:data.workflowId})
        if(!findWorkflow){
            res.status(404).json(new HttpResponse(false,"Workflow not found"))
        }

        const credentialResponse = await CredentialsModel.create(data)

        findWorkflow?.credentials.push(credentialResponse._id);
        findWorkflow?.save();

        res.status(200).json(new HttpResponse(true,"success",credentialResponse))


    } catch (error) {
        console.log(error)
    }
}


export async function deleteCredential(req:Request,res:Response) {

try {
    
    const credentialId = req.query.id as string;

    if(!credentialId){
        res.status(400).json(new HttpResponse(false,"Invalid Id"));
        return;
    }

    





} catch (error) {
    
}



}